window.toolkitData = {
  sections: [
    "Monitoring Recruitment",
    "Escalation",
    "Access to Patients",
    "Study Protocol",
    "Delivery Staff Resources",
    "Support Services",
    "Study Supplies and Equipment",
    "Training",
    "IT",
    "Communication and Awareness",
    "Patient Pathway",
    "Share and Learn"
  ],
  nodes: {
    welcome: {
      id: "welcome",
      type: "section_start",
      layout: "home",
      section: "Start",
      title: "Back on Track Toolkit",
      text: "This toolkit helps research delivery teams work through a structured set of questions when a study is missing recruitment milestones.",
      faqs: [
        {
          question: "Who should use this toolkit?",
          answer: "Research delivery teams can use this toolkit when a study is not meeting expected recruitment milestones and a structured review is needed."
        },
        {
          question: "What does the toolkit do?",
          answer: "It guides teams through key questions across study delivery, highlights possible barriers, and records the recommended actions and pathway taken."
        },
        {
          question: "Will I get a summary at the end?",
          answer: "Yes. At the end of the journey you can review the completion summary and download the pathway taken as a CSV."
        },
        {
          question: "Who do I contact for technical support?",
          answer: "For technical support, contact tate.graham2@nhs.net."
        }
      ],
      next: "toolkit_intro",
      nextLabel: "Continue"
    },
    toolkit_intro: {
      id: "toolkit_intro",
      type: "section_start",
      section: "Start",
      title: "Back on Track Toolkit",
      text: "Use this toolkit to work through a structured set of questions when a study is missing recruitment milestones.",
      next: "start_question",
      nextLabel: "Start toolkit"
    },
    start_question: {
      id: "start_question",
      type: "question",
      section: "Start",
      title: "Starting point",
      text: "Is the study missing recruitment milestones?",
      options: [
        { label: "Yes", next: "intro_missing" },
        { label: "No", next: "on_track" }
      ]
    },
    on_track: {
      id: "on_track",
      type: "exit",
      section: "Start",
      title: "Study on track",
      text: "Great news, the study is on track. You can still use this tool to help keep the study on track while you continue to monitor study performance.",
      next: "completion_summary",
      nextLabel: "Finish",
      outcome: "on_track"
    },
    intro_missing: {
      id: "intro_missing",
      type: "action",
      section: "Start",
      title: "Toolkit overview",
      text: "Work through each section to determine why the study is failing. You can see a summary of suggested actions at the end of the toolkit.",
      next: "monitoring_tools"
    },

    monitoring_tools: {
      id: "monitoring_tools",
      type: "question",
      section: "Monitoring Recruitment",
      title: "Monitoring Recruitment",
      text: "Do you have the right tools, access and training to monitor recruitment?",
      helperText: "Examples: EDGE, ODP, effective screening log.",
      options: [
        { label: "Yes", next: "escalation_issues" },
        { label: "No", next: "monitoring_action" }
      ]
    },
    monitoring_action: {
      id: "monitoring_action",
      type: "action",
      section: "Monitoring Recruitment",
      title: "Monitoring Recruitment",
      text: "Implement a system to monitor and track performance.",
      next: "monitoring_training_issue"
    },
    monitoring_training_issue: {
      id: "monitoring_training_issue",
      type: "question",
      section: "Monitoring Recruitment",
      title: "Monitoring Recruitment",
      text: "Is there a training issue?",
      options: [
        { label: "Yes", next: "training_gaps" },
        { label: "No", next: "escalation_issues" }
      ]
    },

    escalation_issues: {
      id: "escalation_issues",
      type: "question",
      section: "Escalation",
      title: "Escalation",
      text: "Do you have issues that you have been unable to resolve?",
      options: [
        { label: "Yes", next: "escalation_already" },
        { label: "No", next: "access_patients_clinical_team" }
      ]
    },
    escalation_already: {
      id: "escalation_already",
      type: "question",
      section: "Escalation",
      title: "Escalation",
      text: "Have you escalated the study?",
      options: [
        { label: "Yes", next: "escalation_barriers" },
        { label: "No", next: "escalation_action" }
      ]
    },
    escalation_action: {
      id: "escalation_action",
      type: "action",
      section: "Escalation",
      title: "Escalation",
      text: "Escalate to the appropriate people or teams. This may include the Principal Investigator, Team Lead, R&D, RRDN, Sponsor, or other relevant stakeholders.",
      next: "escalation_barriers"
    },
    escalation_barriers: {
      id: "escalation_barriers",
      type: "question",
      section: "Escalation",
      title: "Escalation",
      text: "Are the barriers still impeding recruitment even after escalation?",
      options: [
        { label: "Yes", next: "escalation_exit" },
        { label: "No", next: "access_patients_clinical_team" }
      ]
    },
    escalation_exit: {
      id: "escalation_exit",
      type: "exit",
      section: "Escalation",
      title: "Escalation required",
      text: "R&D / Team Lead should inform the Chief Investigator and Sponsor that the study will not deliver to time and target at the site, and determine next steps.",
      next: "completion_summary",
      nextLabel: "View summary",
      outcome: "early_exit"
    },

    access_patients_clinical_team: {
      id: "access_patients_clinical_team",
      type: "question",
      section: "Access to Patients",
      title: "Access to Patients",
      text: "Are you struggling to get the clinical team to approach patients to initially discuss the study?",
      options: [
        { label: "Yes", next: "access_patients_action" },
        { label: "No", next: "protocol_impeding" }
      ]
    },
    access_patients_action: {
      id: "access_patients_action",
      type: "action",
      section: "Access to Patients",
      title: "Access to Patients",
      text: "Facilitate a meeting with the Principal Investigator to identify appropriate and workable solutions. If unsuccessful, escalate to the Team Lead.",
      next: "protocol_impeding"
    },

    protocol_impeding: {
      id: "protocol_impeding",
      type: "question",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Is the protocol impeding recruitment?",
      options: [
        { label: "Yes", next: "protocol_inclusion_impeding" },
        { label: "No", next: "staff_clinical_lack" }
      ]
    },
    protocol_inclusion_impeding: {
      id: "protocol_inclusion_impeding",
      type: "question",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Are the inclusion/exclusion criteria impeding recruitment?",
      options: [
        { label: "Yes", next: "protocol_discussed_with_sponsor" },
        { label: "No", next: "protocol_substantial_modification" }
      ]
    },
    protocol_discussed_with_sponsor: {
      id: "protocol_discussed_with_sponsor",
      type: "question",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Has this been discussed with the PI and brought to the attention of the Sponsor?",
      options: [
        { label: "Yes", next: "protocol_continue_with_restrictions" },
        { label: "No", next: "protocol_inform_sponsor" }
      ]
    },
    protocol_inform_sponsor: {
      id: "protocol_inform_sponsor",
      type: "action",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Inform the Sponsor.",
      next: "protocol_continue_with_restrictions"
    },
    protocol_continue_with_restrictions: {
      id: "protocol_continue_with_restrictions",
      type: "question",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Can you continue to deliver the study with the inclusion/exclusion criteria restrictions?",
      options: [
        { label: "Yes", next: "protocol_substantial_modification" },
        { label: "No", next: "protocol_site_will_not_deliver_exit" }
      ]
    },
    protocol_substantial_modification: {
      id: "protocol_substantial_modification",
      type: "question",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Is a substantial modification impeding recruitment?",
      options: [
        { label: "Yes", next: "protocol_substantial_modification_action" },
        { label: "No", next: "protocol_participant_requirements" }
      ]
    },
    protocol_substantial_modification_action: {
      id: "protocol_substantial_modification_action",
      type: "action",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Discuss with the PI, R&D and Team Lead to determine whether the study is still viable and identify potential solutions.",
      next: "protocol_study_viable"
    },
    protocol_study_viable: {
      id: "protocol_study_viable",
      type: "question",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Is the study still viable?",
      options: [
        { label: "Yes", next: "protocol_resume_after_modification" },
        { label: "No", next: "protocol_not_viable_exit" }
      ]
    },
    protocol_resume_after_modification: {
      id: "protocol_resume_after_modification",
      type: "action",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Implement relevant changes and resume recruitment following approval of the protocol modification.",
      next: "staff_clinical_lack"
    },
    protocol_not_viable_exit: {
      id: "protocol_not_viable_exit",
      type: "exit",
      section: "Study Protocol",
      title: "Study viability issue",
      text: "R&D / Team Lead should inform the Chief Investigator and Sponsor that the study will not deliver to time and target at the site. Determine next steps.",
      next: "completion_summary",
      nextLabel: "View summary",
      outcome: "early_exit"
    },
    protocol_participant_requirements: {
      id: "protocol_participant_requirements",
      type: "question",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Are the requirements on participants during the study impeding recruitment?",
      helperText: "Examples: number and frequency of visits, venue, follow-up arrangements.",
      options: [
        { label: "Yes", next: "protocol_reduce_impact" },
        { label: "No", next: "protocol_supporting_services_requirements" }
      ]
    },
    protocol_reduce_impact: {
      id: "protocol_reduce_impact",
      type: "question",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Can these be managed to reduce the negative impact on participants?",
      helperText: "Examples: combining visits, remote visits, venues to suit patients, reimbursed travel expenses.",
      options: [
        { label: "Yes", next: "protocol_reduce_impact_action" },
        { label: "No", next: "protocol_continue_with_patient_journey" }
      ]
    },
    protocol_reduce_impact_action: {
      id: "protocol_reduce_impact_action",
      type: "action",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Implement necessary changes and resume recruitment.",
      next: "staff_clinical_lack"
    },
    protocol_continue_with_patient_journey: {
      id: "protocol_continue_with_patient_journey",
      type: "question",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Can you continue to deliver the study within the confines of the patient journey as specified in the study protocol?",
      options: [
        { label: "Yes", next: "protocol_supporting_services_requirements" },
        { label: "No", next: "protocol_site_will_not_deliver_exit" }
      ]
    },
    protocol_supporting_services_requirements: {
      id: "protocol_supporting_services_requirements",
      type: "question",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Are the requirements of the protocol on supporting services or departments affecting study delivery?",
      options: [
        { label: "Yes", next: "protocol_supporting_services_action" },
        { label: "No", next: "protocol_competing_studies" }
      ]
    },
    protocol_supporting_services_action: {
      id: "protocol_supporting_services_action",
      type: "action",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Identify with the supporting department the reasons why study delivery is being impeded.",
      next: "support_services_resource_issue"
    },
    protocol_competing_studies: {
      id: "protocol_competing_studies",
      type: "question",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Are competing studies affecting delivery of this study?",
      options: [
        { label: "Yes", next: "protocol_competing_studies_action" },
        { label: "No", next: "protocol_other_issues" }
      ]
    },
    protocol_competing_studies_action: {
      id: "protocol_competing_studies_action",
      type: "action",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Discuss with Team Lead, R&D, Principal Investigator, clinical team and Sponsor to identify issues and options for managing this.",
      next: "protocol_competing_studies_ongoing"
    },
    protocol_competing_studies_ongoing: {
      id: "protocol_competing_studies_ongoing",
      type: "question",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Is the issue still ongoing?",
      options: [
        { label: "Yes", next: "protocol_participant_requirements" },
        { label: "No", next: "protocol_other_issues" }
      ]
    },
    protocol_other_issues: {
      id: "protocol_other_issues",
      type: "question",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Are there any other aspects of the study protocol impeding recruitment?",
      options: [
        { label: "Yes", next: "protocol_other_issues_action" },
        { label: "No", next: "staff_clinical_lack" }
      ]
    },
    protocol_other_issues_action: {
      id: "protocol_other_issues_action",
      type: "action",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Discuss with Team Lead, R&D, Principal Investigator, clinical team and Sponsor to identify issues and options for managing this.",
      next: "protocol_other_issues_ongoing"
    },
    protocol_other_issues_ongoing: {
      id: "protocol_other_issues_ongoing",
      type: "question",
      section: "Study Protocol",
      title: "Study Protocol",
      text: "Is the issue still ongoing?",
      options: [
        { label: "Yes", next: "protocol_participant_requirements" },
        { label: "No", next: "staff_clinical_lack" }
      ]
    },
    protocol_site_will_not_deliver_exit: {
      id: "protocol_site_will_not_deliver_exit",
      type: "exit",
      section: "Study Protocol",
      title: "Delivery risk",
      text: "Discuss with Team Lead, PI and R&D team with a view to informing the Chief Investigator and Sponsor that the study will not deliver to time and target at the site. Determine next steps.",
      next: "completion_summary",
      nextLabel: "View summary",
      outcome: "early_exit"
    },

    staff_clinical_lack: {
      id: "staff_clinical_lack",
      type: "question",
      section: "Delivery Staff Resources",
      title: "Delivery Staff Resources",
      text: "Is recruitment being affected by a lack of clinical staff to support patient identification and recruitment?",
      options: [
        { label: "Yes", next: "staff_clinical_action" },
        { label: "No", next: "staff_research_lack" }
      ]
    },
    staff_clinical_action: {
      id: "staff_clinical_action",
      type: "action",
      section: "Delivery Staff Resources",
      title: "Delivery Staff Resources",
      text: "Discuss potential solutions with the Principal Investigator.",
      next: "staff_clinical_resolved"
    },
    staff_clinical_resolved: {
      id: "staff_clinical_resolved",
      type: "question",
      section: "Delivery Staff Resources",
      title: "Delivery Staff Resources",
      text: "Has this resolved the issue?",
      options: [
        { label: "Yes", next: "staff_research_lack" },
        { label: "No", next: "staff_resource_exit" }
      ]
    },
    staff_research_lack: {
      id: "staff_research_lack",
      type: "question",
      section: "Delivery Staff Resources",
      title: "Delivery Staff Resources",
      text: "Is recruitment being affected by a lack of research staff to run the study?",
      options: [
        { label: "Yes", next: "staff_workload_review" },
        { label: "No", next: "support_services_resource_issue" }
      ]
    },
    staff_workload_review: {
      id: "staff_workload_review",
      type: "question",
      section: "Delivery Staff Resources",
      title: "Delivery Staff Resources",
      text: "Will a workload review address this problem?",
      options: [
        { label: "Yes", next: "support_services_resource_issue" },
        { label: "No", next: "staff_resource_exit" }
      ]
    },
    staff_resource_exit: {
      id: "staff_resource_exit",
      type: "exit",
      section: "Delivery Staff Resources",
      title: "Resource escalation",
      text: "Discuss with R&D / Team Lead. If appropriate, R&D / Team Lead should inform the Chief Investigator and Sponsor that the study will not deliver to time and target at the site and determine next steps.",
      next: "completion_summary",
      nextLabel: "View summary",
      outcome: "early_exit"
    },

    support_services_resource_issue: {
      id: "support_services_resource_issue",
      type: "question",
      section: "Support Services",
      title: "Support Services",
      text: "Is recruitment being affected by a resource issue in support services?",
      helperText: "Examples: pharmacy, radiology, pathology.",
      options: [
        { label: "Yes", next: "support_services_resolve_with_department" },
        { label: "No", next: "supplies_absent" }
      ]
    },
    support_services_resolve_with_department: {
      id: "support_services_resolve_with_department",
      type: "question",
      section: "Support Services",
      title: "Support Services",
      text: "Can the issue be resolved by working with the supporting service department to implement a solution?",
      options: [
        { label: "Yes", next: "supplies_absent" },
        { label: "No", next: "support_services_funding" }
      ]
    },
    support_services_funding: {
      id: "support_services_funding",
      type: "question",
      section: "Support Services",
      title: "Support Services",
      text: "Is there adequate funding provided within the study grant to support study activity?",
      options: [
        { label: "Yes", next: "support_services_funding_action" },
        { label: "No", next: "support_services_exit" }
      ]
    },
    support_services_funding_action: {
      id: "support_services_funding_action",
      type: "action",
      section: "Support Services",
      title: "Support Services",
      text: "If additional funding is not the solution to the resource issue, discuss with Team Lead and relevant R&D staff to identify the cause and consider whether escalation is required.",
      next: "supplies_absent"
    },
    support_services_exit: {
      id: "support_services_exit",
      type: "exit",
      section: "Support Services",
      title: "Support Services escalation",
      text: "Discuss with R&D / Team Lead. If appropriate, R&D / Team Lead should inform the Chief Investigator and Sponsor that the study will not deliver to time and target at the site and determine next steps.",
      next: "completion_summary",
      nextLabel: "View summary",
      outcome: "early_exit"
    },

    supplies_absent: {
      id: "supplies_absent",
      type: "question",
      section: "Study Supplies and Equipment",
      title: "Study Supplies and Equipment",
      text: "Is study delivery being affected by the absence of study drugs, consumables, equipment or packaging?",
      options: [
        { label: "Yes", next: "supplies_sponsor_address" },
        { label: "No", next: "training_gaps" }
      ]
    },
    supplies_sponsor_address: {
      id: "supplies_sponsor_address",
      type: "question",
      section: "Study Supplies and Equipment",
      title: "Study Supplies and Equipment",
      text: "Can the Sponsor address the needs to a satisfactory conclusion?",
      options: [
        { label: "Yes", next: "training_gaps" },
        { label: "No", next: "supplies_external_escalation" }
      ]
    },
    supplies_external_escalation: {
      id: "supplies_external_escalation",
      type: "action",
      section: "Study Supplies and Equipment",
      title: "Study Supplies and Equipment",
      text: "Discuss with Team Lead, R&D, relevant support services and Principal Investigator as appropriate, with a view to starting an external escalation process involving the RRDN, Chief Investigator and Sponsor.",
      next: "training_gaps"
    },

    training_gaps: {
      id: "training_gaps",
      type: "question",
      section: "Training",
      title: "Training",
      text: "Are there any training gaps that are affecting study delivery?",
      options: [
        { label: "Yes", next: "training_action" },
        { label: "No", next: "it_issues" }
      ]
    },
    training_action: {
      id: "training_action",
      type: "action",
      section: "Training",
      title: "Training",
      text: "Identify training needs and work with the Sponsor and clinical teams to address them.",
      next: "it_issues"
    },

    it_issues: {
      id: "it_issues",
      type: "question",
      section: "IT",
      title: "IT",
      text: "Is the study being affected by IT issues?",
      helperText: "Examples: remote access to study databases for eCRF collection or training, access to monitoring and tracking systems, access to laptops/iPads/PCs, study software, external Wi-Fi.",
      options: [
        { label: "Yes", next: "it_local_trust_responsibility" },
        { label: "No", next: "communication_strategy_reviewed" }
      ]
    },
    it_local_trust_responsibility: {
      id: "it_local_trust_responsibility",
      type: "question",
      section: "IT",
      title: "IT",
      text: "Is it the responsibility of the local Trust IT department to resolve?",
      options: [
        { label: "Yes", next: "it_local_trust_action" },
        { label: "No", next: "it_sponsor_resolve" }
      ]
    },
    it_local_trust_action: {
      id: "it_local_trust_action",
      type: "action",
      section: "IT",
      title: "IT",
      text: "Work with the Trust IT department to address the issue. Escalate to Team Lead, Sponsor, Principal Investigator and RRDN as appropriate.",
      next: "it_local_trust_timely"
    },
    it_local_trust_timely: {
      id: "it_local_trust_timely",
      type: "question",
      section: "IT",
      title: "IT",
      text: "Can the local Trust IT department resolve the block in a timely way?",
      options: [
        { label: "Yes", next: "communication_strategy_reviewed" },
        { label: "No", next: "it_local_trust_exit" }
      ]
    },
    it_local_trust_exit: {
      id: "it_local_trust_exit",
      type: "exit",
      section: "IT",
      title: "IT escalation",
      text: "Discuss with Team Lead, PI and R&D team with a view to informing the Chief Investigator and Sponsor that the study will not deliver to time and target at the site and determine next steps.",
      next: "completion_summary",
      nextLabel: "View summary",
      outcome: "early_exit"
    },
    it_sponsor_resolve: {
      id: "it_sponsor_resolve",
      type: "question",
      section: "IT",
      title: "IT",
      text: "Can the Sponsor resolve the block in a timely way?",
      options: [
        { label: "Yes", next: "communication_strategy_reviewed" },
        { label: "No", next: "it_sponsor_exit" }
      ]
    },
    it_sponsor_exit: {
      id: "it_sponsor_exit",
      type: "exit",
      section: "IT",
      title: "IT escalation",
      text: "Escalate the unresolved IT issue with Team Lead, PI, R&D, Sponsor and/or RRDN as appropriate and determine next steps.",
      next: "completion_summary",
      nextLabel: "View summary",
      outcome: "early_exit"
    },

    communication_strategy_reviewed: {
      id: "communication_strategy_reviewed",
      type: "question",
      section: "Communication and Awareness",
      title: "Communication and Awareness",
      text: "Have you reviewed your recruitment strategy to consider new ways of promoting and raising awareness of the study?",
      options: [
        { label: "Yes", next: "communication_materials" },
        { label: "No", next: "communication_revisit_strategy" }
      ]
    },
    communication_revisit_strategy: {
      id: "communication_revisit_strategy",
      type: "action",
      section: "Communication and Awareness",
      title: "Communication and Awareness",
      text: "Revisit your recruitment strategy.",
      next: "communication_materials"
    },
    communication_materials: {
      id: "communication_materials",
      type: "question",
      section: "Communication and Awareness",
      title: "Communication and Awareness",
      text: "Do you have recruitment materials?",
      helperText: "Examples: study posters, banners, leaflets, ethics-approved social media text, summary sheets, materials for patient and public areas, MDT clinics, staffrooms, staff newsletters, WhatsApp groups, community sites, GP surgeries, walk-in centres, social media, local radio/TV and patient groups.",
      options: [
        { label: "Yes", next: "communication_epic" },
        { label: "No", next: "communication_escalate_resources" }
      ]
    },
    communication_escalate_resources: {
      id: "communication_escalate_resources",
      type: "action",
      section: "Communication and Awareness",
      title: "Communication and Awareness",
      text: "Escalate required resources to the Sponsor / RRDN.",
      next: "communication_sponsor_actioning"
    },
    communication_sponsor_actioning: {
      id: "communication_sponsor_actioning",
      type: "question",
      section: "Communication and Awareness",
      title: "Communication and Awareness",
      text: "Is the Sponsor actioning the request?",
      options: [
        { label: "Yes", next: "communication_epic" },
        { label: "No", next: "communication_exit" }
      ]
    },
    communication_exit: {
      id: "communication_exit",
      type: "exit",
      section: "Communication and Awareness",
      title: "Communication escalation",
      text: "Discuss with Team Lead, PI and R&D team with a view to informing the Chief Investigator and Sponsor that the study will not deliver to time and target at the site and determine next steps.",
      next: "completion_summary",
      nextLabel: "View summary",
      outcome: "early_exit"
    },
    communication_epic: {
      id: "communication_epic",
      type: "question",
      section: "Communication and Awareness",
      title: "Communication and Awareness",
      text: "Can EPIC be used for effective communication, such as OurPractice Advisory?",
      options: [
        { label: "Yes", next: "communication_epic_action" },
        { label: "No", next: "patient_pathway_impeded" }
      ]
    },
    communication_epic_action: {
      id: "communication_epic_action",
      type: "action",
      section: "Communication and Awareness",
      title: "Communication and Awareness",
      text: "Escalate to the Research Digital Team.",
      next: "patient_pathway_impeded"
    },

    patient_pathway_impeded: {
      id: "patient_pathway_impeded",
      type: "question",
      section: "Patient Pathway",
      title: "Patient Pathway",
      text: "Is the study being impeded by the patient pathway?",
      options: [
        { label: "Yes", next: "patient_pathway_involved_groups" },
        { label: "No", next: "share_contacted_sites" }
      ]
    },
    patient_pathway_involved_groups: {
      id: "patient_pathway_involved_groups",
      type: "question",
      section: "Patient Pathway",
      title: "Patient Pathway",
      text: "Have you involved participants, PPIE, the public and/or patient groups in trying to understand why the study is failing?",
      options: [
        { label: "Yes", next: "patient_pathway_new_ideas" },
        { label: "No", next: "patient_pathway_involve_action" }
      ]
    },
    patient_pathway_involve_action: {
      id: "patient_pathway_involve_action",
      type: "action",
      section: "Patient Pathway",
      title: "Patient Pathway",
      text: "Discuss with Team Lead, Principal Investigator and/or relevant clinical team how patients can be involved to explore the issues.",
      next: "patient_pathway_new_ideas"
    },
    patient_pathway_new_ideas: {
      id: "patient_pathway_new_ideas",
      type: "question",
      section: "Patient Pathway",
      title: "Patient Pathway",
      text: "Have you incorporated new ideas into improving study delivery?",
      options: [
        { label: "Yes", next: "share_contacted_sites" },
        { label: "No", next: "patient_pathway_implement_ideas" }
      ]
    },
    patient_pathway_implement_ideas: {
      id: "patient_pathway_implement_ideas",
      type: "action",
      section: "Patient Pathway",
      title: "Patient Pathway",
      text: "Either implement the new ideas or discuss with Team Lead and Principal Investigator how to overcome any barriers.",
      next: "share_contacted_sites"
    },

    share_contacted_sites: {
      id: "share_contacted_sites",
      type: "question",
      section: "Share and Learn",
      title: "Share and Learn",
      text: "Have you contacted other participating sites to discuss their experiences of finding possible solutions to stumbling blocks?",
      options: [
        { label: "Yes", next: "share_learning_helpful" },
        { label: "No", next: "share_contact_sites_action" }
      ]
    },
    share_contact_sites_action: {
      id: "share_contact_sites_action",
      type: "action",
      section: "Share and Learn",
      title: "Share and Learn",
      text: "Identify a successful participating site using the study Sponsor and local research delivery network as needed, then approach them for sharing and learning.",
      next: "share_learning_helpful"
    },
    share_learning_helpful: {
      id: "share_learning_helpful",
      type: "question",
      section: "Share and Learn",
      title: "Share and Learn",
      text: "Can the learning you have obtained from others help to improve delivery of this study?",
      options: [
        { label: "Yes", next: "share_apply_learning" },
        { label: "No", next: "share_discuss_further" }
      ]
    },
    share_apply_learning: {
      id: "share_apply_learning",
      type: "action",
      section: "Share and Learn",
      title: "Share and Learn",
      text: "Apply the learning.",
      next: "completion_summary"
    },
    share_discuss_further: {
      id: "share_discuss_further",
      type: "action",
      section: "Share and Learn",
      title: "Share and Learn",
      text: "Discuss with Team Lead, Sponsor, Principal Investigator and/or RRDN.",
      next: "completion_summary"
    },

    completion_summary: {
      id: "completion_summary",
      type: "summary",
      section: "Completion Summary",
      title: "Completion Summary",
      text: "Congratulations. You have completed all sections in this toolkit. If there are any areas not covered within the toolkit, please escalate to your Team Lead."
    }
  }
};
