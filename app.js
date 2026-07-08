(function() {
  var data = window.toolkitData || {};
  var nodes = data.nodes || {};
  var orderedSections = data.sections || [];

  var state = {
    currentNodeId: "welcome",
    history: [],
    answers: {},
    log: [],
    outcome: "in_progress",
    sidebarOpen: false
  };

  var appRoot = document.getElementById("app");
  var historyList = document.getElementById("history-list");
  var summaryStatus = document.getElementById("summary-status");
  var summaryCount = document.getElementById("summary-count");
  var homeButton = document.getElementById("home-button");
  var historyToggleButton = document.getElementById("history-toggle-button");
  var closeSidebarButton = document.getElementById("close-sidebar-button");
  var sidebarBackdrop = document.getElementById("sidebar-backdrop");

  function getNode(nodeId) {
    return nodes[nodeId];
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function getProgressLabel(sectionName) {
    var index = orderedSections.indexOf(sectionName);

    if (index === -1) {
      return sectionName;
    }

    return "Section " + (index + 1) + " of " + orderedSections.length;
  }

  function getOutcomeLabel() {
    if (state.outcome === "early_exit") {
      return "This journey ended early because escalation or further action was required.";
    }

    if (state.outcome === "on_track") {
      return "This journey finished at the on-track check.";
    }

    if (state.outcome === "completed") {
      return "This journey completed all toolkit sections.";
    }

    return "Toolkit in progress.";
  }

  function captureSnapshot() {
    return {
      currentNodeId: state.currentNodeId,
      answers: clone(state.answers),
      log: clone(state.log),
      outcome: state.outcome
    };
  }

  function restoreSnapshot(snapshot) {
    state.currentNodeId = snapshot.currentNodeId;
    state.answers = clone(snapshot.answers);
    state.log = clone(snapshot.log);
    state.outcome = snapshot.outcome;
  }

  function getNextNodeSummary(nextId) {
    var nextNode = getNode(nextId);

    if (!nextNode) {
      return {
        resultingNodeId: nextId,
        resultingAction: ""
      };
    }

    return {
      resultingNodeId: nextNode.id,
      resultingAction:
        nextNode.type === "action" || nextNode.type === "exit" ? nextNode.text : ""
    };
  }

  function recordAnswer(node, option) {
    var nextSummary = getNextNodeSummary(option.next);

    state.answers[node.id] = option.label;
    state.log.push({
      stepNumber: state.log.length + 1,
      section: node.section,
      question: node.text,
      answer: option.label,
      action: nextSummary.resultingAction,
      resultingNodeId: nextSummary.resultingNodeId
    });
  }

  function updateOutcomeFromNode(nextNode) {
    if (!nextNode) {
      return;
    }

    if (nextNode.type === "exit") {
      state.outcome = nextNode.outcome || "early_exit";
      return;
    }

    if (nextNode.id === "completion_summary" && state.outcome === "in_progress") {
      state.outcome = "completed";
    }
  }

  function syncShellState() {
    var currentNode = getNode(state.currentNodeId);
    var isHomeScreen = !!(currentNode && currentNode.layout === "home");

    document.body.setAttribute("data-sidebar-open", state.sidebarOpen ? "true" : "false");
    document.body.setAttribute("data-home-screen", isHomeScreen ? "true" : "false");
    historyToggleButton.setAttribute("aria-expanded", state.sidebarOpen ? "true" : "false");
    sidebarBackdrop.hidden = !state.sidebarOpen;
  }

  function openSidebar() {
    state.sidebarOpen = true;
    syncShellState();
  }

  function closeSidebar() {
    state.sidebarOpen = false;
    syncShellState();
  }

  function navigate(nextId, onNavigate) {
    var nextNode = getNode(nextId);

    if (!nextNode) {
      return;
    }

    state.history.push(captureSnapshot());

    if (typeof onNavigate === "function") {
      onNavigate(nextNode);
    }

    updateOutcomeFromNode(nextNode);
    state.currentNodeId = nextId;
    closeSidebar();
    render();
  }

  function goBack() {
    if (!state.history.length) {
      return;
    }

    restoreSnapshot(state.history.pop());
    render();
  }

  function restart() {
    state.currentNodeId = "welcome";
    state.history = [];
    state.answers = {};
    state.log = [];
    state.outcome = "in_progress";
    closeSidebar();
    render();
  }

  function buildSummaryText() {
    var node = getNode(state.currentNodeId);
    var lines = [
      "Back on Track Toolkit summary",
      "",
      "Outcome: " + getOutcomeLabel(),
      "Current screen: " + (node ? node.title : "Unknown"),
      "Questions answered: " + state.log.length
    ];
    var sectionsVisited = [];
    var actions = [];

    state.log.forEach(function(entry) {
      if (sectionsVisited.indexOf(entry.section) === -1) {
        sectionsVisited.push(entry.section);
      }

      if (entry.action) {
        actions.push("- " + entry.action);
      }
    });

    lines.push("");
    lines.push("Sections visited: " + (sectionsVisited.join(", ") || "None"));
    lines.push("");
    lines.push("Journey");

    if (!state.log.length) {
      lines.push("No questions answered yet.");
    }

    state.log.forEach(function(entry) {
      lines.push("");
      lines.push(entry.stepNumber + ". [" + entry.section + "] " + entry.question);
      lines.push("   Answer: " + entry.answer);

      if (entry.action) {
        lines.push("   Recommended action: " + entry.action);
      }

      lines.push("   Next step: " + entry.resultingNodeId);
    });

    if (actions.length) {
      lines.push("");
      lines.push("Recommended actions");
      Array.prototype.push.apply(lines, actions);
    }

    return lines.join("\n");
  }

  function updateCopyButtonLabel(label) {
    return label;
  }

  function copySummary() {
    var summaryText = buildSummaryText();

    function fallbackCopy() {
      var textarea = document.createElement("textarea");
      textarea.value = summaryText;
      textarea.setAttribute("readonly", "readonly");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand("copy");
        updateCopyButtonLabel("Copied");
      } catch (error) {
        window.alert("Unable to copy the summary to the clipboard.");
      }

      document.body.removeChild(textarea);
    }

    if (!navigator.clipboard || typeof navigator.clipboard.writeText !== "function") {
      fallbackCopy();
      return;
    }

    navigator.clipboard
      .writeText(summaryText)
      .then(function() {
        updateCopyButtonLabel("Copied");
      })
      .catch(function() {
        fallbackCopy();
      });
  }

  function buildExportRows() {
    return state.log.map(function(entry, index) {
      return {
        step_number: index + 1,
        section: entry.section,
        question: entry.question,
        answer: entry.answer,
        recommended_action: entry.action,
        resulting_node: entry.resultingNodeId,
        outcome: state.outcome
      };
    });
  }

  function escapeCsvValue(value) {
    var stringValue = String(value == null ? "" : value);

    if (/[",\n]/.test(stringValue)) {
      return '"' + stringValue.replace(/"/g, '""') + '"';
    }

    return stringValue;
  }

  function downloadCsv() {
    var rows = buildExportRows();
    var headers = [
      "step_number",
      "section",
      "question",
      "answer",
      "recommended_action",
      "resulting_node",
      "outcome"
    ];
    var csvLines = [headers.join(",")];

    if (!rows.length) {
      csvLines.push(["", "", "No questions answered yet", "", "", state.currentNodeId, state.outcome].map(escapeCsvValue).join(","));
    } else {
      rows.forEach(function(row) {
        csvLines.push(headers.map(function(header) {
          return escapeCsvValue(row[header]);
        }).join(","));
      });
    }

    var blob = new Blob([csvLines.join("\n")], {
      type: "text/csv;charset=utf-8;"
    });
    var link = document.createElement("a");
    var url = window.URL.createObjectURL(blob);

    link.href = url;
    link.download = "back-on-track-toolkit-summary.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  function createButton(config) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = config.secondary
      ? "button button-secondary"
      : "button";
    button.textContent = config.label;
    button.disabled = !!config.disabled;
    button.addEventListener("click", config.onClick);
    return button;
  }

  function renderQuestion(node, container) {
    var optionGrid = document.createElement("div");
    optionGrid.className = "option-grid";

    node.options.forEach(function(option) {
      optionGrid.appendChild(
        createButton({
          label: option.label,
          onClick: function() {
            navigate(option.next, function() {
              recordAnswer(node, option);
            });
          }
        })
      );
    });

    container.appendChild(optionGrid);
  }

  function renderActionLikeNode(node, container) {
    var actions = document.createElement("div");
    actions.className = "option-grid";

    actions.appendChild(
      createButton({
        label: node.nextLabel || "Continue",
        onClick: function() {
          if (node.type === "exit") {
            state.outcome = node.outcome || "early_exit";
          }

          navigate(node.next);
        }
      })
    );

    container.appendChild(actions);
  }

  function createSummaryBlock(title, items, emptyMessage) {
    var block = document.createElement("section");
    block.className = "summary-block";
    var heading = document.createElement("h3");
    heading.textContent = title;
    block.appendChild(heading);

    var list = document.createElement("ul");
    list.className = "summary-screen-list";

    (items.length ? items : [emptyMessage]).forEach(function(item) {
      var li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });

    block.appendChild(list);
    return block;
  }

  function renderSummaryNode(node, container) {
    var summaryScreen = document.createElement("div");
    summaryScreen.className = "summary-screen";

    var banner = document.createElement("section");
    banner.className = "summary-outcome-banner";
    banner.innerHTML =
      "<p class=\"eyebrow\">Completion report</p><p>" +
      getOutcomeLabel() +
      "</p>";
    summaryScreen.appendChild(banner);

    var text = document.createElement("p");
    text.className = "summary-screen-copy";
    text.textContent = node.text;
    summaryScreen.appendChild(text);

    var uniqueSections = [];
    var questionItems = [];
    var actionItems = [];

    state.log.forEach(function(entry) {
      if (uniqueSections.indexOf(entry.section) === -1) {
        uniqueSections.push(entry.section);
      }

      questionItems.push(entry.question + " Answer: " + entry.answer);

      if (entry.action) {
        actionItems.push(entry.action);
      }
    });

    var summaryGrid = document.createElement("div");
    summaryGrid.className = "summary-grid";
    summaryGrid.appendChild(
      createSummaryBlock("Sections visited", uniqueSections, "No sections visited.")
    );
    summaryGrid.appendChild(
      createSummaryBlock("Questions answered", questionItems, "No questions answered.")
    );
    summaryGrid.appendChild(
      createSummaryBlock(
        "Actions recommended",
        actionItems,
        "No specific actions were triggered in this pathway."
      )
    );

    summaryScreen.appendChild(summaryGrid);
    container.appendChild(summaryScreen);
  }

  function renderFooter(node, container) {
    if (node.layout === "home") {
      return;
    }

    var footer = document.createElement("div");
    footer.className = "footer-actions";

    footer.appendChild(
      createButton({
        label: "Restart",
        secondary: true,
        onClick: restart
      })
    );

    if (node.type === "summary") {
      footer.appendChild(
        createButton({
          label: "Copy summary",
          onClick: copySummary
        })
      );
      footer.appendChild(
        createButton({
          label: "Download CSV",
          secondary: true,
          onClick: downloadCsv
        })
      );
    }

    container.appendChild(footer);
  }

  function renderHistoryPanel() {
    historyList.innerHTML = "";
    summaryCount.textContent = String(state.log.length);

    if (!state.log.length) {
      var empty = document.createElement("li");
      empty.className = "empty-history";
      empty.textContent = "No answers recorded yet.";
      historyList.appendChild(empty);
      summaryStatus.textContent = "Toolkit in progress.";
      return;
    }

    state.log.forEach(function(entry) {
      var item = document.createElement("li");
      var step = document.createElement("span");
      step.className = "timeline-step";
      step.textContent = "Step " + entry.stepNumber;

      var question = document.createElement("span");
      question.className = "timeline-question";
      question.textContent = "[" + entry.section + "] " + entry.question;

      var answer = document.createElement("span");
      answer.className = "timeline-answer";
      answer.textContent = "Answer: " + entry.answer;

      item.appendChild(step);
      item.appendChild(question);
      item.appendChild(answer);

      if (entry.action) {
        var action = document.createElement("span");
        action.className = "timeline-action";
        action.textContent = "Recommended action: " + entry.action;
        item.appendChild(action);
      }

      historyList.appendChild(item);
    });

    summaryStatus.textContent = getOutcomeLabel();
  }

  function render() {
    var node = getNode(state.currentNodeId);

    if (!node) {
      return;
    }

    appRoot.innerHTML = "";

    var shell = document.createElement("div");
    shell.className = "screen-shell";

    if (node.layout !== "home") {
      var meta = document.createElement("div");
      meta.className = "screen-meta";
      var progressLabel = getProgressLabel(node.section);

      if (progressLabel !== node.section) {
        var progress = document.createElement("span");
        progress.className = "meta-pill";
        progress.textContent = progressLabel;
        meta.appendChild(progress);
      }

      var section = document.createElement("span");
      section.className = "meta-pill";
      section.textContent = node.section;
      meta.appendChild(section);

      shell.appendChild(meta);
    }

    var screenCard = document.createElement("section");
    screenCard.className = "screen-card";

    var title = document.createElement("p");
    title.className = "screen-title";
    title.textContent = node.title;

    if (node.type !== "summary") {
      screenCard.appendChild(title);
    }

    var screenMain = document.createElement("div");
    screenMain.className = "screen-main";

    var contentStack = document.createElement("div");
    contentStack.className = "screen-content-stack";

    if (node.type === "summary") {
      var summaryLead = document.createElement("div");
      summaryLead.className = "summary-panel-block";
      var summaryQuestion = document.createElement("h2");
      summaryQuestion.className = "screen-question";
      summaryQuestion.textContent = "Your toolkit journey is complete.";
      summaryLead.appendChild(summaryQuestion);
      contentStack.appendChild(summaryLead);
    } else if (node.layout === "home") {
      var homePanel = document.createElement("div");
      homePanel.className = "home-panel";

      var homeQuestion = document.createElement("h2");
      homeQuestion.className = "screen-question";
      homeQuestion.textContent = node.text;
      homePanel.appendChild(homeQuestion);

      if (node.helperText) {
        var homeHelper = document.createElement("p");
        homeHelper.className = "screen-helper";
        homeHelper.textContent = node.helperText;
        homePanel.appendChild(homeHelper);
      }

      var homeNote = document.createElement("p");
      homeNote.className = "screen-note";
      homeNote.textContent = "Continue to open the toolkit.";
      homePanel.appendChild(homeNote);

      contentStack.appendChild(homePanel);
    } else {
      var isRecommendation = node.type === "action" || node.type === "exit";
      var contentPanel = document.createElement("div");
      contentPanel.className = isRecommendation
        ? "recommendation-panel"
        : "question-panel";

      var contentTag = document.createElement("span");
      contentTag.className = isRecommendation
        ? "content-tag recommendation-tag"
        : "content-tag question-tag";
      contentTag.textContent = isRecommendation ? "Recommendation" : "Question";
      contentPanel.appendChild(contentTag);

      var question = document.createElement("h2");
      question.className = "screen-question";
      question.textContent = node.text;
      contentPanel.appendChild(question);

      if (node.helperText) {
        var helper = document.createElement("p");
        helper.className = "screen-helper";
        helper.textContent = node.helperText;
        contentPanel.appendChild(helper);
      }

      if (node.type === "section_start") {
        var startNote = document.createElement("p");
        startNote.className = "screen-note";
        startNote.textContent = "Start with the first check, then move through the toolkit one screen at a time.";
        contentPanel.appendChild(startNote);
      }

      if (node.type === "action") {
        var note = document.createElement("p");
        note.className = "screen-note";
        note.textContent = "Review the action above, then continue when you are ready.";
        contentPanel.appendChild(note);
      }

      if (node.type === "exit") {
        var exitNote = document.createElement("p");
        exitNote.className = "screen-note";
        exitNote.textContent = "This pathway needs escalation or a managed next step before the toolkit can continue.";
        contentPanel.appendChild(exitNote);
      }

      contentStack.appendChild(contentPanel);
    }

    screenMain.appendChild(contentStack);
    screenCard.appendChild(screenMain);

    if (node.type === "question") {
      renderQuestion(node, screenCard);
    } else if (node.type === "summary") {
      renderSummaryNode(node, screenCard);
    } else {
      renderActionLikeNode(node, screenCard);
    }

    renderFooter(node, screenCard);
    shell.appendChild(screenCard);
    appRoot.appendChild(shell);
    renderHistoryPanel();
    syncShellState();
  }

  historyToggleButton.addEventListener("click", function() {
    if (state.sidebarOpen) {
      closeSidebar();
      return;
    }

    openSidebar();
  });
  homeButton.addEventListener("click", restart);
  closeSidebarButton.addEventListener("click", closeSidebar);
  sidebarBackdrop.addEventListener("click", closeSidebar);

  render();
})();
