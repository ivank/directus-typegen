export interface app_block_richtext {
  id: string;
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  title: string;
  content: string;
  status: "published" | "draft" | "archived";
}
export interface app_blocks {}
export interface app_content {}
export interface app_static_settings {
  id: string;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  section_legal_title: string;
  section_third_party_consent_content: string | app_block_richtext;
  section_third_party_consent_title: string;
  section_personal_data_usage_title: string;
  section_personal_data_usage_content: string | app_block_richtext;
  section_consent_manager_title: string;
  sharing_title: string;
  section_socialmedia_title: string;
  data_and_privacy_title: string;
  support_title: string;
  section_faqs_title: string;
  section_fluent_support_title: string;
  section_fluent_support_content: string | app_block_richtext;
  section_socialmedia_links: string[] | app_static_settings[];
  account_settings_title: string;
  account_settings_browser_notification_title: string;
  section_measurement_preferences_title: string;
  section_communication_preferences_title: string;
  account_settings_browser_notification_content: string;
  section_legal_terms_title: string;
  section_legal_privacy_title: string;
  section_legal_cookie_title: string;
  section_legal_consent_title: string;
  section_legal_medadvice_title: string;
  section_legal_medadvice_content: string;
  section_legal_privacy_content: string;
  section_legal_cookie_content: string;
  section_legal_consent_content: string;
  section_legal_terms_content: string;
}
export interface app_static_settings_socialmedia_links {
  id: number;
  app_static_settings_id: string;
  socialmedia_links_id: string;
  sort: number;
}
export interface article_sources {
  id: string;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  article_source_title: string;
  article_source_link: string;
  article_source_publish_date: "datetime";
  article_source_primary: boolean;
}
export interface articles {
  id: string;
  status: "published" | "scheduled" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  article_title: string;
  article_hero_image: string | directus_files;
  article_blocks: any;
  article_reviewer: number | medical_reviewer;
  article_tags: "json";
  dashboard_cards: string[] | articles[];
  web_cards: string[] | articles[];
  story_cards: string[] | articles[];
  primary_topic: string | topics;
  secondary_topics: string[] | articles[];
  article_type: "app" | "blog" | "app_blog";
  article_reading_time: string;
  slug: string;
  article_teaser: string;
  article_blocks_blog: any;
  article_publish_date: "datetime";
  article_author: string | authors;
  page_metadata: string | website_page_metadata;
  article_fh_recommends: boolean;
  blog_featured: boolean;
  prismic_id: string;
  article_sources: "json";
  article_views: number;
  other_topics: string[] | articles[];
  article_stories: any;
  article_deeplink: string;
}
export type articles_article_blocks =
  | {
      id: number;
      articles_id: string | articles;
      item: block_richtext;
      collection: "block_richtext";
      sort: number;
    }
  | {
      id: number;
      articles_id: string | articles;
      item: block_breaker_image;
      collection: "block_breaker_image";
      sort: number;
    }
  | {
      id: number;
      articles_id: string | articles;
      item: block_breaker_list;
      collection: "block_breaker_list";
      sort: number;
    }
  | {
      id: number;
      articles_id: string | articles;
      item: block_breaker_quote;
      collection: "block_breaker_quote";
      sort: number;
    }
  | {
      id: number;
      articles_id: string | articles;
      item: block_breaker_stats;
      collection: "block_breaker_stats";
      sort: number;
    }
  | {
      id: number;
      articles_id: string | articles;
      item: block_breaker_text;
      collection: "block_breaker_text";
      sort: number;
    }
  | {
      id: number;
      articles_id: string | articles;
      item: block_inline_image;
      collection: "block_inline_image";
      sort: number;
    };
export type articles_article_blocks_blog =
  | {
      id: number;
      articles_id: string | articles;
      item: block_breaker_stats;
      collection: "block_breaker_stats";
      sort: number;
    }
  | {
      id: number;
      articles_id: string | articles;
      item: block_breaker_quote;
      collection: "block_breaker_quote";
      sort: number;
    }
  | {
      id: number;
      articles_id: string | articles;
      item: block_breaker_image;
      collection: "block_breaker_image";
      sort: number;
    }
  | {
      id: number;
      articles_id: string | articles;
      item: block_breaker_quicktip;
      collection: "block_breaker_quicktip";
      sort: number;
    }
  | {
      id: number;
      articles_id: string | articles;
      item: block_richtext_blog;
      collection: "block_richtext_blog";
      sort: number;
    }
  | {
      id: number;
      articles_id: string | articles;
      item: block_breaker_list;
      collection: "block_breaker_list";
      sort: number;
    }
  | {
      id: number;
      articles_id: string | articles;
      item: block_breaker_text;
      collection: "block_breaker_text";
      sort: number;
    };
export interface articles_article_sources {
  id: number;
  articles_id: string;
  article_sources_id: string;
}
export interface articles_article_sources_1 {
  id: number;
  articles_id: string;
  article_sources_id: string;
}
export interface articles_articles_cards_dashboard {
  id: number;
  articles_id: string;
  articles_cards_dashboard_id: number;
  sort: number;
}
export interface articles_articles_cards_story {
  id: number;
  articles_id: string;
  articles_cards_story_id: number;
  sort: number;
}
export interface articles_articles_cards_web {
  id: number;
  articles_id: string;
  articles_cards_web_id: number;
  sort: number;
}
export interface articles_block_breaker_text {
  id: number;
  articles_id: string;
  block_breaker_text_id: number;
}
export interface articles_blocks {}
export interface articles_cards {}
export interface articles_cards_dashboard {
  id: number;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  design: "t" | "it";
  title: string;
  image: string | directus_files;
}
export interface articles_cards_story {
  id: number;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  design: "itp" | "q" | "tp" | "tpc" | "tisp";
  title: string;
  subtitle: string;
  paragraph: string;
  image: string | directus_files;
  quote_author: string;
  quote_author_title: string;
}
export interface articles_cards_web {
  id: number;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  design: "t" | "tp" | "tpc" | "tpi" | "tspi";
  title: string;
  paragraph: string;
  subtitle: string;
  image: string | directus_files;
}
export interface articles_link_tables {}
export interface articles_stories {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  dashboard_card_design: "t" | "it";
  dashboard_card_title: string;
  dashboard_card_image: string | directus_files;
  story_card_design: "itp" | "tp" | "tpc" | "tisp" | "q";
  story_card_title: string;
  story_card_subtitle: string;
  story_card_paragraph: string;
  story_card_quote_author: string;
  story_card_quote_author_title: string;
  story_card_image: string | directus_files;
  web_card_design: "t" | "tp" | "tpc" | "tpi" | "tspi";
  web_card_title: string;
  web_card_subtitle: string;
  web_card_paragraph: string;
  web_card_image: string | directus_files;
  fk_articles: string;
}
export interface articles_topics {
  id: number;
  articles_id: string;
  topics_id: string;
}
export interface articles_topics_1 {
  id: number;
  articles_id: string;
  topics_id: string;
}
export interface authors {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  author_name: string;
  author_title: string;
  author_bio: string;
  author_location: string;
  author_email: string;
  author_linkedin: string;
  author_image: string | directus_files;
  slug: string;
  prismic_id: string;
}
export interface block_breaker_image {
  id: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  image: string | directus_files;
}
export interface block_breaker_list {
  id: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  title: string;
  content: string;
  list_items: "json";
  list_type: "ol" | "ul";
}
export interface block_breaker_quicktip {
  id: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  title: string;
  paragraph: string;
}
export interface block_breaker_quote {
  id: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  name: string;
  content: string;
  academic_title: string;
}
export interface block_breaker_stats {
  id: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  statistic: string;
  content: string;
  illustration: string | directus_files;
}
export interface block_breaker_text {
  id: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  content: string;
}
export interface block_inline_image {
  id: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  image: string | directus_files;
}
export interface block_richtext {
  id: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  content: string;
}
export interface block_richtext_blog {
  id: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  content: string;
  anchor_title: string;
  Anchor: boolean;
}
export interface care_story_card_dashboard {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  title: string;
  design: "t" | "it";
}
export interface care_story_card_endslate {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  title: string;
  paragraph: string;
  cta_button_label: string;
  cta_label: string;
}
export interface care_story_card_openslate {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  title: string;
  paragraph: string;
  cta_button_label: string;
  cta_type: "skip" | "snooze" | "reminder";
  cta_label: string;
  cta_button_type: "next" | "path";
  cta_button_target: string | torchbearer;
}
export interface care_story_card_questionnaire {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  emr_questionnaire_identifier: string;
}
export interface consultation_specialty_areas {
  id: number;
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  tile_icon: string | directus_files;
  tile_color: string;
  tile_description: string;
  fact_code: string | fact;
}
export interface docapp_content {}
export interface docapp_settings {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  legal_title: string;
  billing_invoice_title: string;
  legal_content: string;
  account_information_title: string;
  professional_details_title: string;
  professional_details_label_primary_specialisation: string;
  professional_details_label_registration_number: string;
  professional_details_label_education_credentials: string;
  professional_details_label_yoe: string;
  professional_details_label_about: string;
  billing_invoice_content_comingsoon: string;
  billing_invoice_nav_alert: string;
  account_information_label_first_name: string;
  account_information_label_last_name: string;
  account_information_label_dob: string;
  account_information_label_languages: string;
  account_information_label_fhemail: string;
  account_information_label_password: string;
  account_information_cta_password_url: string;
  account_information_cta_password_label: string;
  account_information_cta_cr_label: string;
  account_information_cta_cr_url: string;
  professional_details_cta_cr_label: string;
  professional_details_cta_cr_url: string;
}
export interface fact {
  fact_code: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  fact_display: string;
  fact_system: string;
  emr_code: string;
  emr_display: string;
  emr_system: string;
  fact_code_hashed: string;
  fact_id: string;
  fmh_fact_id: string;
}
export interface faq_groups {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  faq_group_title: string;
  faqs: string[] | faq_groups[];
  faq_group_type: "app" | "web" | "app_web";
}
export interface faq_groups_faqs {
  id: number;
  faq_groups_id: string;
  faqs_id: string;
  sort: number;
}
export interface faqs {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  question: string;
  answer: string;
  image: string | directus_files;
  faq_group: string | faq_groups;
}
export interface fluent_team {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  first_name: string;
  last_name: string;
  organizational_unit:
    | "leadership"
    | "technology"
    | "content"
    | "marketing"
    | "design"
    | "product"
    | "projects"
    | "operations"
    | "advisory-board";
  image: string | directus_files;
  linkedin_url: string;
  bio: string;
  linkedin_icon: string;
  background_color: string;
  designation: string;
}
export interface global_content {}
export interface language {
  code: string;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  display_value: string;
  language_code: number;
}
export interface medical_reviewer {
  id: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  reviewer_name: string;
  reviewer_qualification: string;
  reviewer_email: string;
  reviewer_registration_id: string;
  reviewer_bio: string;
  reviewer_specialty: string | fact;
  image: string | directus_files;
  yoe_since: "datetime";
  status: "published" | "scheduled" | "draft" | "archived";
  practitioner_role: "json";
  qualifications: number[] | medical_reviewer[];
  languages: any;
  slug: string;
}
export interface medical_reviewer_medical_reviewer_qualification {
  id: number;
  medical_reviewer_id: number;
  medical_reviewer_qualification_id: number;
}
export interface medical_reviewer_qualification {
  id: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  qualification_date: "datetime";
  qualification_title: string;
  qualification_description: string;
}
export interface open_positions {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  job_title: string;
  job_location: string;
  job_description: string;
  job_source_id: string;
}
export interface press_articles {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  cta_button_icon: string;
  cta_button_label: string;
  cta_button_link: string;
  image: string | directus_files;
  teaser: string;
  title: string;
}
export interface profile_completion_reference {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  fhir_resource: string;
  percentage: number;
  fhir_resource_id: string;
  description: string;
  patient_confirm_na: boolean;
}
export interface record_story_card_dashboard {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  design: "t" | "ict" | "it";
  title: string;
  image: string | directus_files;
}
export interface record_story_card_openslate {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  title: string;
  paragraph: string;
  cta_button_label: string;
  cta_button_type: "next" | "path";
  cta_button_target: string;
  cta_label: string;
  cta_type: "skip" | "snooze" | "reminder";
  image: string | directus_files;
}
export interface record_story_card_prompt {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  eyebrow: string;
  prompt: string;
  cta_button_label: string;
  cta_button_target: string;
  cta_label: string;
  cta_type: "skip" | "snooze" | "reminder";
  cta_target: string;
  cta_button_type: "continue" | "path" | "reminder" | "skip" | "snooze";
  title: string;
  paragraph: string;
  cta_1_label: string;
  cta_1_type: "path";
  cta_2_label: string;
  cta_2_type: "path";
  cta_1_target: string | torchbearer;
  cta_2_target: string | torchbearer;
}
export interface record_stroy_card_dyk {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  design: "tip" | "tp";
  eyebrow: string;
  title: string;
  paragraph: string;
  image: string | directus_files;
  cta_button_label: string;
  cta_button_type: "continue" | "path" | "reminder" | "skip" | "snooze";
  cta_button_target: string;
}
export interface socialmedia_links {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  title: string;
  link: string;
  icon_website: string | directus_files;
  icon_patapp: string | directus_files;
  application: "json";
}
export interface sories_link_tables {}
export interface stories {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  story_type: "care" | "record";
  care_story_dashboard_cards: string[] | stories[];
  care_story_story_cards: any;
  story_title: string;
  record_story_dashboard_cards: string[] | stories[];
  record_story_story_cards: any;
  story_tag_line: string;
  min_age: number;
  max_age: number;
  frequency: number;
  period_start: "datetime";
  period_end: "datetime";
  fact_codes: string[] | stories[];
  fmh_fact_codes: string[] | stories[];
  care_story_classification:
    | "CareStoryReproductiveHealth"
    | "CareStoryConditions"
    | "CareStoryReproductiveHealthMale"
    | "CareStoryPreventativeScreenings"
    | "CareStoryMedications"
    | "CareStoryFamilyMedicalHistory"
    | "CareStorySupplements"
    | "CareStoryAllergiesIntolerances"
    | "CareStorySymptoms"
    | "CareStorySurgeriesProcedures"
    | "CareStoryExercise"
    | "CareStoryDiet"
    | "CareStoryAlcoholTobaccoCaffeine"
    | "CareStoryMentalHealthAndStress"
    | "CareStoryOccupation"
    | "default";
}
export interface stories_care_story_card_dashboard {
  id: number;
  stories_id: string;
  care_story_card_dashboard_id: string;
}
export type stories_care_story_story_cards =
  | {
      id: number;
      stories_id: string | stories;
      item: care_story_card_endslate;
      collection: "care_story_card_endslate";
      sort: number;
    }
  | {
      id: number;
      stories_id: string | stories;
      item: care_story_card_openslate;
      collection: "care_story_card_openslate";
      sort: number;
    }
  | {
      id: number;
      stories_id: string | stories;
      item: care_story_card_questionnaire;
      collection: "care_story_card_questionnaire";
      sort: number;
    };
export interface stories_fact {
  id: number;
  stories_id: string;
  fact_fact_code: string;
}
export interface stories_fact_1 {
  id: number;
  stories_id: string;
  fact_fact_code: string;
}
export interface stories_record_story_card_dashboard {
  id: number;
  stories_id: string;
  record_story_card_dashboard_id: string;
}
export type stories_record_story_story_cards =
  | {
      id: number;
      stories_id: string | stories;
      item: record_story_card_prompt;
      collection: "record_story_card_prompt";
      sort: number;
    }
  | {
      id: number;
      stories_id: string | stories;
      item: record_stroy_card_dyk;
      collection: "record_stroy_card_dyk";
      sort: number;
    };
export interface testimonials {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  content: string;
  name: string;
}
export interface topics {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  topic_class: "primary" | "secondary" | "other";
  image: string | directus_files;
  teaser: string;
  description: string;
  fact_code: string | fact;
  slug: string;
  subtopics: string[] | topics[];
}
export interface topics_topics {
  id: number;
  topics_id: string;
  related_topics_id: string;
}
export interface torchbearer {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  path: string;
  target_android: string;
  target_ios: string;
  target_webapp: string;
  querystring_uuid_variable: string;
}
export interface website {}
export interface website_block_carousel {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  description: string;
  title: string;
  slides: string[] | website_block_carousel[];
  image_background: string | directus_files;
  icon_slide_left: string | directus_files;
  icon_slide_right: string | directus_files;
}
export interface website_block_carousel_slides {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  image: string | directus_files;
  paragraph: string;
  slide_type: "image" | "itp_teaser" | "hulahoop";
  title: string;
  cta_button_link: string;
  image_mobile: string | directus_files;
  cta_button_label: string;
}
export interface website_block_carousel_website_block_carousel_slides {
  id: number;
  website_block_carousel_id: string;
  website_block_carousel_slides_id: string;
  sort: number;
}
export interface website_block_faq {
  id: string;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  title: string;
  status: "published" | "draft" | "archived";
  icon_expand: string | directus_files;
  icon_collapse: string | directus_files;
  faq_groups: string[] | website_block_faq[];
  image_parallax_left: string | directus_files;
  image_parallax_right: string | directus_files;
  icon_menu_selector: string | directus_files;
}
export interface website_block_faq_faq_groups {
  id: number;
  website_block_faq_id: string;
  faq_groups_id: string;
}
export interface website_block_hero {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  hero_type:
    | "t"
    | "ti"
    | "tiv"
    | "tpi"
    | "tpci"
    | "tpcci"
    | "tci"
    | "tcci"
    | "about-us";
  title: string;
  paragraph: string;
  image: string | directus_files;
  cta_button_1_label: string;
  cta_button_1_url: string;
  cta_button_2_label: string;
  cta_button_2_url: string;
  image_background: string | directus_files;
  subtitle: string;
}
export interface website_block_menuitem {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  cta_title: string;
  cta_target: string;
}
export interface website_block_portfolio {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  portfolio_type:
    | "featured articles"
    | "featured_press"
    | "team"
    | "advisory-board"
    | "press";
  title: string;
  portfolio_item_limit: number;
  cta_button_label: string;
  cta_button_url: string;
  filter: boolean;
  paragraph: string;
  search_box_placeholder: string;
  search_box_icon: string;
  search_no_results: string;
  search_no_results_icon: string | directus_files;
  portfolio_no_results: string;
  portfolio_no_results_icon: string | directus_files;
}
export interface website_block_prallax {
  id: number;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  title: string;
  image_top_row: string | directus_files;
  paragraph_top_row: string;
  paragraph_bottom_row: string;
  image_bottom_row: string | directus_files;
}
export interface website_block_process {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  design: "iris-100" | "springgreen-100";
  title: string;
  paragraph: string;
  content: string;
  image_top: string | directus_files;
  image_right: string | directus_files;
}
export interface website_block_richtext {
  id: string;
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  richtext: string;
  title: string;
  status: "published" | "draft" | "archived";
}
export interface website_block_showcase {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  title: string;
  image_background: string | directus_files;
  block_type: "3c-circular" | "certifications" | "media";
  image_background_mobile: string | directus_files;
  cta_button_label: string;
  cta_button_link: string;
  content: any;
  title_display: boolean;
}
export type website_block_showcase_content = {
  id: number;
  website_block_showcase_id: string | website_block_showcase;
  item: website_block_showcase_items;
  collection: "website_block_showcase_items";
  sort: number;
};
export interface website_block_showcase_items {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  content: string;
  image: string | directus_files;
  title: string;
  media_embed_code: string;
}
export interface website_block_teaser {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  content: string;
  cta_button_label: string;
  cta_button_link: string;
  image: string | directus_files;
  image_mask: string | directus_files;
  image_mask_mobile: string | directus_files;
}
export interface website_block_testimonials {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  title: string;
  image_background: string | directus_files;
  icon_quote: string | directus_files;
  testimonials: string[] | website_block_testimonials[];
}
export interface website_block_testimonials_testimonials {
  id: number;
  website_block_testimonials_id: string;
  testimonials_id: string;
}
export interface website_blocks {}
export interface website_component_clinically_reviewed {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  title: string;
  content: string;
  icon_badge: string | directus_files;
  icon_close: string | directus_files;
  image_background: string | directus_files;
}
export interface website_component_delete_account {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  slug: string;
  title: string;
  paragraph: string;
  field_input_name_placeholder: string;
  field_input_name_error: string;
  field_input_mobile_error: string;
  field_input_mobile_placeholder: string;
  field_input_email_placeholder: string;
  field_input_email_error: string;
  cta_button_label_cancel: string;
  cta_button_label_confirm: string;
  image_background_left: string | directus_files;
  image_background_right: string | directus_files;
  icon_close: string | directus_files;
  icon_success: string | directus_files;
  cta_button_success: string;
}
export interface website_component_early_access {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  title: string;
  paragraph: string;
  field_input_name_placeholder: string;
  field_input_email_placeholder: string;
  field_checkbox_earlyaccess_label: string;
  field_checkbox_subscribe_label: string;
  legal_note: string;
  cta_button_label: string;
  field_input_name_error: string;
  field_input_email_error: string;
  cta_button_success: string;
  cta_button_error: string;
  icon_close: string | directus_files;
  image_background_left: string | directus_files;
  image_background_right: string | directus_files;
}
export interface website_component_footer {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  logo: string | directus_files;
  tag_line: string;
  copyright_line: string;
  socialmedia: string[] | website_component_footer[];
  menu_left: any;
  menu_right: any;
  tag_line_newsletter: string;
  field_input_email_placeholder: string;
  cta_button_label_newsletter: string;
  cta_image_ios: string | directus_files;
  cta_image_ios_link: string;
  cta_image_android: string | directus_files;
  cta_image_android_link: string;
}
export type website_component_footer_menu_left = {
  id: number;
  website_component_footer_id: string | website_component_footer;
  item: website_block_menuitem;
  collection: "website_block_menuitem";
  sort: number;
};
export type website_component_footer_menu_right = {
  id: number;
  website_component_footer_id: string | website_component_footer;
  item: website_block_menuitem;
  collection: "website_block_menuitem";
  sort: number;
};
export interface website_component_footer_socialmedia_links {
  id: number;
  website_component_footer_id: string;
  socialmedia_links_id: string;
  sort: number;
}
export interface website_component_menu {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  image_logo: string | directus_files;
  image_background: string | directus_files;
  socialmedia: any;
  icon_expand: string | directus_files;
  icon_collapse: string | directus_files;
  image_logo_plain: string | directus_files;
  tagline: string;
  icon_back_to_top: string | directus_files;
  cta_1_button_label: string;
  cta_2_button_label: string;
  cta_2_target: string;
  cta_1_target: string;
  menu_items: any;
}
export type website_component_menu_menu_items = {
  id: number;
  website_component_menu_id: string | website_component_menu;
  item: website_block_menuitem;
  collection: "website_block_menuitem";
  sort: number;
};
export type website_component_menu_socialmedia = {
  id: number;
  website_component_menu_id: string | website_component_menu;
  item: socialmedia_links;
  collection: "socialmedia_links";
  sort: number;
};
export interface website_component_prefooter {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  title: string;
  paragraph: string;
  cta_button_label: string;
  cta_button_link: string;
  prefooter_type: "tp" | "tpc" | "ns";
  field_input_email_placeholder: string;
  legal_note: string;
  image_background_left: string | directus_files;
  image_background_right: string | directus_files;
}
export interface website_components {}
export interface website_page_about_us {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  content: any;
  prefooter: string | website_component_prefooter;
  title: string;
  slug: string;
  metadata: string | website_page_metadata;
}
export type website_page_about_us_content =
  | {
      id: number;
      website_page_about_us_id: string | website_page_about_us;
      item: website_block_hero;
      collection: "website_block_hero";
    }
  | {
      id: number;
      website_page_about_us_id: string | website_page_about_us;
      item: website_block_portfolio;
      collection: "website_block_portfolio";
    };
export interface website_page_author {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  slug: string;
  page_metadata: string | website_page_metadata;
  title: string;
  title_articles: string;
  cta_button_label: string;
}
export interface website_page_blog {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  slug: string;
  title: string;
  view_tooltip_grid_active: string;
  view_tooltip_grid_inactive: string;
  view_tooltip_list_active: string;
  view_tooltip_list_inactive: string;
  filter_topics_note: string;
  cta_button_label: string;
  prefooter: string | website_component_prefooter;
  static_author: string;
  static_reviewer: string;
  static_cta_share_article: string;
  static_link_disclaimer_text: string;
  static_link_disclaimer_url: string;
  static_title_browse_topics: string;
  static_title_related_articles: string;
  static_cta_button_articles_label: string;
  cta_button_articles_url: string;
  filter_topics_title: string;
  filter_types_title: string;
  filter_types_note: string;
  filter_cta_more: string;
  blog_card_read_time: string;
  hero_featured_articles_image_left: string | directus_files;
  hero_featured_articles_image_right: string | directus_files;
  hero_featured_articles_cta_button_label: string;
  blog_filter_icon_expand: string | directus_files;
  blog_filter_icon_collapse: string | directus_files;
  blog_filter_cta_label_reset: string;
  blog_filter_icon_tag_add: string | directus_files;
  blog_filter_icon_tag_remove: string | directus_files;
  static_icon_share_article: string | directus_files;
  static_cta_button_label_sources_more: string;
  static_cta_button_label_sources_less: string;
  static_title_sources: string;
  page_metadata: string | website_page_metadata;
}
export interface website_page_careers {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  slug: string;
  page_metadata: string | website_page_metadata;
  page_hero: string | website_block_hero;
  title: string;
  title_listing: string;
  field_input_search_placeholder: string;
  field_input_search_icon: string;
  static_job_description_hero: string | website_block_hero;
  static_title_application_form: string;
  static_field_input_error: string;
  static_field_input_firstname_required: boolean;
  static_field_input_lastname_required: boolean;
  static_field_input_email_required: boolean;
  static_field_input_phone_required: boolean;
  static_field_input_linkedin_required: boolean;
  static_field_input_upload_resume_required: boolean;
  static_field_input_firstname_placeholder: string;
  static_field_input_lastname_placeholder: string;
  static_field_input_email_placeholder: string;
  static_field_input_phone_placeholder: string;
  static_field_input_linkedin_placeholder: string;
  static_field_input_upload_placeholder: string;
  static_field_input_nofile_placeholder: string;
  static_cta_button_label: string;
  static_cta_success: string;
  static_cta_error: string;
}
export interface website_page_contact_us {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  page_metadata: string | website_page_metadata;
  prefooter: string | website_component_prefooter;
  title: string;
  addresses: string;
  static_title_contact_form: string;
  static_field_input_error: string;
  static_field_input_firstname_placeholder: string;
  static_field_input_firstname_required: boolean;
  static_field_input_lastname_placeholder: string;
  static_field_input_lastname_required: boolean;
  static_field_input_email_placeholder: string;
  static_field_input_email_required: boolean;
  static_field_input_phone_placeholder: string;
  static_field_input_phone_required: boolean;
  static_cta_error: string;
  static_field_textarea_message_placeholder: string;
  static_field_textarea_message_required: boolean;
  static_cta_button_label: string;
  static_cta_button_link: string;
  static_field_textarea_limit: number;
  slug: string;
  static_cta_success: string;
}
export interface website_page_doctor_login {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  slug: string;
  page_metadata: string | website_page_metadata;
  field_label: string;
  field_placeholder: string;
  field_icon: string;
  cta_label: string;
  cta_error: string;
  title: string;
  content: string;
  image: string | directus_files;
  image_background: string | directus_files;
  image_mask: string | directus_files;
}
export interface website_page_faqs {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  title: string;
  page_metadata: string | website_page_metadata;
  content: any;
  prefooter: string | website_component_prefooter;
}
export type website_page_faqs_content =
  | {
      id: number;
      website_page_faqs_id: string | website_page_faqs;
      item: website_block_faq;
      collection: "website_block_faq";
      sort: number;
    }
  | {
      id: number;
      website_page_faqs_id: string | website_page_faqs;
      item: website_block_hero;
      collection: "website_block_hero";
      sort: number;
    };
export interface website_page_home {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  page_metadata: string | website_page_metadata;
  slug: string;
  title: string;
  prefooter: string | website_component_prefooter;
  content: any;
}
export type website_page_home_content =
  | {
      id: number;
      website_page_home_id: string | website_page_home;
      item: website_block_hero;
      collection: "website_block_hero";
      sort: number;
    }
  | {
      id: number;
      website_page_home_id: string | website_page_home;
      item: website_block_richtext;
      collection: "website_block_richtext";
      sort: number;
    }
  | {
      id: number;
      website_page_home_id: string | website_page_home;
      item: website_block_carousel;
      collection: "website_block_carousel";
      sort: number;
    }
  | {
      id: number;
      website_page_home_id: string | website_page_home;
      item: website_block_faq;
      collection: "website_block_faq";
      sort: number;
    }
  | {
      id: number;
      website_page_home_id: string | website_page_home;
      item: website_block_portfolio;
      collection: "website_block_portfolio";
      sort: number;
    }
  | {
      id: number;
      website_page_home_id: string | website_page_home;
      item: website_block_prallax;
      collection: "website_block_prallax";
      sort: number;
    }
  | {
      id: number;
      website_page_home_id: string | website_page_home;
      item: website_block_teaser;
      collection: "website_block_teaser";
      sort: number;
    }
  | {
      id: number;
      website_page_home_id: string | website_page_home;
      item: website_block_testimonials;
      collection: "website_block_testimonials";
      sort: number;
    };
export interface website_page_legal {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  slug: string;
  content: any;
  title: string;
  page_metadata: string | website_page_metadata;
}
export type website_page_legal_content = {
  id: number;
  website_page_legal_id: string | website_page_legal;
  item: website_block_richtext;
  collection: "website_block_richtext";
};
export interface website_page_medical_reviewer {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  title: string;
  title_articles: string;
  cta_button_label: string;
  slug: string;
  page_metadata: string | website_page_metadata;
}
export interface website_page_metadata {
  id: string;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  xml_sitemap_relevant: boolean;
  sitemap_navigation_element: boolean;
  page_title: string;
  meta_description: string;
  meta_keywords: "json";
  meta_robots_tags: "json";
  og_title: string;
  og_description: string;
  og_type: "article" | "profile" | "website";
  og_url: string;
  og_image_alt: string;
  twitter_site: string;
  twitter_creator: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string | directus_files;
  twitter_image_alt: string;
  schemaorg_url: string;
  schemaorg_name: string;
  schemaorg_description: string;
  schemaorg_contact_point_email: string;
  schemaorg_headline: string;
  schemaorg_author_name: string;
  schemaorg_socialmedia_links: string[] | website_page_metadata[];
  nav_footer_left: boolean;
  nav_footer_right: boolean;
  nav_main: boolean;
  prismic_id: string;
  og_image: string | directus_files;
}
export interface website_page_metadata_website_socialmedia_links {
  id: number;
  website_page_metadata_id: string;
}
export interface website_page_our_process {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  slug: string;
  page_metadata: string | website_page_metadata;
  title: string;
  content: any;
  images_parallax_left: any;
  images_parallax_right: any;
  prefooter: string | website_component_prefooter;
}
export type website_page_our_process_content =
  | {
      id: number;
      website_page_our_process_id: string | website_page_our_process;
      item: website_block_hero;
      collection: "website_block_hero";
      sort: number;
    }
  | {
      id: number;
      website_page_our_process_id: string | website_page_our_process;
      item: website_block_process;
      collection: "website_block_process";
      sort: number;
    };
export interface website_page_our_process_files_1 {
  id: number;
  website_page_our_process_id: string;
  directus_files_id: string;
}
export interface website_page_our_process_files_2 {
  id: number;
  website_page_our_process_id: string;
  directus_files_id: string;
}
export interface website_page_press {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  title: string;
  content: any;
  prefooter: string | website_component_prefooter;
  slug: string;
  page_metadata: string | website_page_metadata;
}
export type website_page_press_content = {
  id: number;
  website_page_press_id: string | website_page_press;
  item: website_block_portfolio;
  collection: "website_block_portfolio";
};
export interface website_page_privacy_matters {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  page_metadata: string | website_page_metadata;
  title: string;
  content: any;
  prefooter: string | website_component_prefooter;
}
export type website_page_privacy_matters_content =
  | {
      id: number;
      website_page_privacy_matters_id: string | website_page_privacy_matters;
      item: website_block_hero;
      collection: "website_block_hero";
    }
  | {
      id: number;
      website_page_privacy_matters_id: string | website_page_privacy_matters;
      item: website_block_showcase;
      collection: "website_block_showcase";
    };
export interface website_page_sandbox {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  title: string;
  page_metadata: string | website_page_metadata;
  page_content: any;
  page_prefooter: string | website_component_prefooter;
}
export type website_page_sandbox_page_content =
  | {
      id: number;
      website_page_sandbox_id: string | website_page_sandbox;
      item: website_block_carousel;
      collection: "website_block_carousel";
      sort: number;
    }
  | {
      id: number;
      website_page_sandbox_id: string | website_page_sandbox;
      item: website_block_hero;
      collection: "website_block_hero";
      sort: number;
    }
  | {
      id: number;
      website_page_sandbox_id: string | website_page_sandbox;
      item: website_block_faq;
      collection: "website_block_faq";
      sort: number;
    }
  | {
      id: number;
      website_page_sandbox_id: string | website_page_sandbox;
      item: website_block_portfolio;
      collection: "website_block_portfolio";
      sort: number;
    }
  | {
      id: number;
      website_page_sandbox_id: string | website_page_sandbox;
      item: website_block_prallax;
      collection: "website_block_prallax";
      sort: number;
    }
  | {
      id: number;
      website_page_sandbox_id: string | website_page_sandbox;
      item: website_block_process;
      collection: "website_block_process";
      sort: number;
    }
  | {
      id: number;
      website_page_sandbox_id: string | website_page_sandbox;
      item: website_block_richtext;
      collection: "website_block_richtext";
      sort: number;
    }
  | {
      id: number;
      website_page_sandbox_id: string | website_page_sandbox;
      item: website_block_showcase;
      collection: "website_block_showcase";
      sort: number;
    }
  | {
      id: number;
      website_page_sandbox_id: string | website_page_sandbox;
      item: website_block_teaser;
      collection: "website_block_teaser";
      sort: number;
    }
  | {
      id: number;
      website_page_sandbox_id: string | website_page_sandbox;
      item: website_block_testimonials;
      collection: "website_block_testimonials";
      sort: number;
    };
export interface website_page_why_we_care {
  id: string;
  status: "published" | "draft" | "archived";
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  slug: string;
  title: string;
  page_metadata: string | website_page_metadata;
  content: any;
  prefooter: string | website_component_prefooter;
}
export type website_page_why_we_care_content =
  | {
      id: number;
      website_page_why_we_care_id: string | website_page_why_we_care;
      item: website_block_hero;
      collection: "website_block_hero";
      sort: number;
    }
  | {
      id: number;
      website_page_why_we_care_id: string | website_page_why_we_care;
      item: website_block_carousel;
      collection: "website_block_carousel";
      sort: number;
    }
  | {
      id: number;
      website_page_why_we_care_id: string | website_page_why_we_care;
      item: website_block_faq;
      collection: "website_block_faq";
      sort: number;
    }
  | {
      id: number;
      website_page_why_we_care_id: string | website_page_why_we_care;
      item: website_block_portfolio;
      collection: "website_block_portfolio";
      sort: number;
    }
  | {
      id: number;
      website_page_why_we_care_id: string | website_page_why_we_care;
      item: website_block_prallax;
      collection: "website_block_prallax";
      sort: number;
    }
  | {
      id: number;
      website_page_why_we_care_id: string | website_page_why_we_care;
      item: website_block_richtext;
      collection: "website_block_richtext";
      sort: number;
    }
  | {
      id: number;
      website_page_why_we_care_id: string | website_page_why_we_care;
      item: website_block_teaser;
      collection: "website_block_teaser";
      sort: number;
    }
  | {
      id: number;
      website_page_why_we_care_id: string | website_page_why_we_care;
      item: website_block_showcase;
      collection: "website_block_showcase";
      sort: number;
    };
export interface website_pages {}
export interface directus_files {
  copyright: string;
  notes: string;
  prismic_id: string;
}
export interface Schema {
  app_block_richtext: app_block_richtext[];
  app_blocks: app_blocks[];
  app_content: app_content[];
  app_static_settings: app_static_settings[];
  app_static_settings_socialmedia_links: app_static_settings_socialmedia_links[];
  article_sources: article_sources[];
  articles: articles[];
  articles_article_blocks: articles_article_blocks[];
  articles_article_blocks_blog: articles_article_blocks_blog[];
  articles_article_sources: articles_article_sources[];
  articles_article_sources_1: articles_article_sources_1[];
  articles_articles_cards_dashboard: articles_articles_cards_dashboard[];
  articles_articles_cards_story: articles_articles_cards_story[];
  articles_articles_cards_web: articles_articles_cards_web[];
  articles_block_breaker_text: articles_block_breaker_text[];
  articles_blocks: articles_blocks[];
  articles_cards: articles_cards[];
  articles_cards_dashboard: articles_cards_dashboard[];
  articles_cards_story: articles_cards_story[];
  articles_cards_web: articles_cards_web[];
  articles_link_tables: articles_link_tables[];
  articles_stories: articles_stories[];
  articles_topics: articles_topics[];
  articles_topics_1: articles_topics_1[];
  authors: authors[];
  block_breaker_image: block_breaker_image[];
  block_breaker_list: block_breaker_list[];
  block_breaker_quicktip: block_breaker_quicktip[];
  block_breaker_quote: block_breaker_quote[];
  block_breaker_stats: block_breaker_stats[];
  block_breaker_text: block_breaker_text[];
  block_inline_image: block_inline_image[];
  block_richtext: block_richtext[];
  block_richtext_blog: block_richtext_blog[];
  care_story_card_dashboard: care_story_card_dashboard[];
  care_story_card_endslate: care_story_card_endslate[];
  care_story_card_openslate: care_story_card_openslate[];
  care_story_card_questionnaire: care_story_card_questionnaire[];
  consultation_specialty_areas: consultation_specialty_areas[];
  docapp_content: docapp_content[];
  docapp_settings: docapp_settings[];
  fact: fact[];
  faq_groups: faq_groups[];
  faq_groups_faqs: faq_groups_faqs[];
  faqs: faqs[];
  fluent_team: fluent_team[];
  global_content: global_content[];
  language: language[];
  medical_reviewer: medical_reviewer[];
  medical_reviewer_medical_reviewer_qualification: medical_reviewer_medical_reviewer_qualification[];
  medical_reviewer_qualification: medical_reviewer_qualification[];
  open_positions: open_positions[];
  press_articles: press_articles[];
  profile_completion_reference: profile_completion_reference[];
  record_story_card_dashboard: record_story_card_dashboard[];
  record_story_card_openslate: record_story_card_openslate[];
  record_story_card_prompt: record_story_card_prompt[];
  record_stroy_card_dyk: record_stroy_card_dyk[];
  socialmedia_links: socialmedia_links[];
  sories_link_tables: sories_link_tables[];
  stories: stories[];
  stories_care_story_card_dashboard: stories_care_story_card_dashboard[];
  stories_care_story_story_cards: stories_care_story_story_cards[];
  stories_fact: stories_fact[];
  stories_fact_1: stories_fact_1[];
  stories_record_story_card_dashboard: stories_record_story_card_dashboard[];
  stories_record_story_story_cards: stories_record_story_story_cards[];
  testimonials: testimonials[];
  topics: topics[];
  topics_topics: topics_topics[];
  torchbearer: torchbearer[];
  website: website[];
  website_block_carousel: website_block_carousel[];
  website_block_carousel_slides: website_block_carousel_slides[];
  website_block_carousel_website_block_carousel_slides: website_block_carousel_website_block_carousel_slides[];
  website_block_faq: website_block_faq[];
  website_block_faq_faq_groups: website_block_faq_faq_groups[];
  website_block_hero: website_block_hero[];
  website_block_menuitem: website_block_menuitem[];
  website_block_portfolio: website_block_portfolio[];
  website_block_prallax: website_block_prallax[];
  website_block_process: website_block_process[];
  website_block_richtext: website_block_richtext[];
  website_block_showcase: website_block_showcase[];
  website_block_showcase_content: website_block_showcase_content[];
  website_block_showcase_items: website_block_showcase_items[];
  website_block_teaser: website_block_teaser[];
  website_block_testimonials: website_block_testimonials[];
  website_block_testimonials_testimonials: website_block_testimonials_testimonials[];
  website_blocks: website_blocks[];
  website_component_clinically_reviewed: website_component_clinically_reviewed[];
  website_component_delete_account: website_component_delete_account[];
  website_component_early_access: website_component_early_access[];
  website_component_footer: website_component_footer[];
  website_component_footer_menu_left: website_component_footer_menu_left[];
  website_component_footer_menu_right: website_component_footer_menu_right[];
  website_component_footer_socialmedia_links: website_component_footer_socialmedia_links[];
  website_component_menu: website_component_menu[];
  website_component_menu_menu_items: website_component_menu_menu_items[];
  website_component_menu_socialmedia: website_component_menu_socialmedia[];
  website_component_prefooter: website_component_prefooter[];
  website_components: website_components[];
  website_page_about_us: website_page_about_us[];
  website_page_about_us_content: website_page_about_us_content[];
  website_page_author: website_page_author[];
  website_page_blog: website_page_blog[];
  website_page_careers: website_page_careers[];
  website_page_contact_us: website_page_contact_us[];
  website_page_doctor_login: website_page_doctor_login[];
  website_page_faqs: website_page_faqs[];
  website_page_faqs_content: website_page_faqs_content[];
  website_page_home: website_page_home[];
  website_page_home_content: website_page_home_content[];
  website_page_legal: website_page_legal[];
  website_page_legal_content: website_page_legal_content[];
  website_page_medical_reviewer: website_page_medical_reviewer[];
  website_page_metadata: website_page_metadata[];
  website_page_metadata_website_socialmedia_links: website_page_metadata_website_socialmedia_links[];
  website_page_our_process: website_page_our_process[];
  website_page_our_process_content: website_page_our_process_content[];
  website_page_our_process_files_1: website_page_our_process_files_1[];
  website_page_our_process_files_2: website_page_our_process_files_2[];
  website_page_press: website_page_press[];
  website_page_press_content: website_page_press_content[];
  website_page_privacy_matters: website_page_privacy_matters[];
  website_page_privacy_matters_content: website_page_privacy_matters_content[];
  website_page_sandbox: website_page_sandbox[];
  website_page_sandbox_page_content: website_page_sandbox_page_content[];
  website_page_why_we_care: website_page_why_we_care[];
  website_page_why_we_care_content: website_page_why_we_care_content[];
  website_pages: website_pages[];
}
