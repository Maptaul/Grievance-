import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      // Existing translations
      complainant_login: "Complainant Login",
      admin_login: "Admin Login",
      dashboard: "Dashboard",
      logout: "Logout",
      language: "Language",
      welcome_message:
        "Welcome to the Central Grievance Platform of the Chittagong City Corporation, Bangladesh. We are dedicated to ensuring transparency, accountability, and responsiveness in government services.",
      submit_grievance: "Submit Grievance",
      select_complaint_category: "Select Complaint Category",
      make_complaint: "Make a Complaint",
      category: {
        Electricity: "Electricity",
        Gas: "Gas",
        "Water & Sewerage": "Water & Sewerage",
        "Road & Infrastructure": "Road & Infrastructure",
        "Sanitation & Waste Management": "Sanitation & Waste Management",
        "Public Transport": "Public Transport",
        "Environment & Pollution": "Environment & Pollution",
        "Law & Order": "Law & Order",
        "Animal Control": "Animal Control",
        "Health & Medical": "Health & Medical",
        "The Sidewalk": "The Sidewalk",
        Others: "Others",
      },
      about_us: "About Us",
      contact: "Contact",
      press_kit: "Press Kit",
      copyright: "Copyright",
      all_rights_reserved: "All rights reserved by Chittagong City Corporation",

      // New translations for SubmitComplaint
      report_issue: "Report an Issue",
      improve_community: "Help improve our community",
      submit_anonymously: "Submit Anonymously",
      your_name: "Your Name",
      name_placeholder: "John Doe",
      description_label: "Description",
      description_placeholder: "Describe the issue in detail...",
      add_media: "Add Media",
      take_photo: "Take Photo",
      choose_file: "Choose File",
      invalid_file_type: "Invalid File Type",
      please_upload_valid_files: "Please upload JPEG, PNG, MP4, or PDF files",
      file_too_large: "File Too Large",
      max_file_size: "Maximum file size is 10MB",
      add_location: "Add Current Location",
      update_location: "Update Location",
      location_captured: "Location Captured!",
      latitude: "Latitude",
      longitude: "Longitude",
      location_error: "Location Error",
      enable_location: "Please enable location services",
      unsupported_feature: "Unsupported Feature",
      geolocation_unsupported: "Geolocation not supported",
      missing_info: "Missing Information",
      provide_description: "Please provide a description",
      complaint_submitted: "Complaint Submitted!",
      category_label: "Category",
      complaint_received:
        "We've received your complaint and will process it shortly.",
      location_label: "Location",
      error: "Error",
      submission_failed: "Failed to submit complaint",
      submit_complaint: "Submit Complaint",
    },
  },
  bn: {
    translation: {
      // Existing translations
      complainant_login: "অভিযোগকারীর লগইন",
      admin_login: "অ্যাডমিন লগইন",
      dashboard: "ড্যাশবোর্ড",
      logout: "লগআউট",
      language: "ভাষা",
      welcome_message:
        "চট্টগ্রাম সিটি কর্পোরেশনের কেন্দ্রীয় অভিযোগ প্ল্যাটফর্মে স্বাগতম। আমরা সরকারি সেবার স্বচ্ছতা, জবাবদিহিতা এবং প্রতিক্রিয়াশীলতা নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ।",
      submit_grievance: "অভিযোগ জমা দিন",
      select_complaint_category: "অভিযোগের বিভাগ নির্বাচন করুন",
      make_complaint: "অভিযোগ করুন",
      category: {
        Electricity: "বিদ্যুৎ",
        Gas: "গ্যাস",
        "Water & Sewerage": "পানি ও পয়ঃনিষ্কাশন",
        "Road & Infrastructure": "রাস্তা ও অবকাঠামো",
        "Sanitation & Waste Management": "পরিচ্ছন্নতা ও বর্জ্য ব্যবস্থাপনা",
        "Public Transport": "সার্বজনীন পরিবহন",
        "Environment & Pollution": "পরিবেশ ও দূষণ",
        "Law & Order": "আইন ও শৃঙ্খলা",
        "Animal Control": "প্রাণী নিয়ন্ত্রণ",
        "Health & Medical": "স্বাস্থ্য ও চিকিৎসা",
        "The Sidewalk": "পথচারী পথ",
        Others: "অন্যান্য",
      },
      about_us: "আমাদের সম্পর্কে",
      contact: "যোগাযোগ",
      press_kit: "প্রেস কিট",
      copyright: "কপিরাইট",
      all_rights_reserved:
        "সকল অধিকার সংরক্ষিত চট্টগ্রাম সিটি কর্পোরেশনের দ্বারা",

      // New translations for SubmitComplaint
      report_issue: "সমস্যা রিপোর্ট করুন",
      improve_community: "আমাদের সম্প্রদায় উন্নত করতে সাহায্য করুন",
      submit_anonymously: "নাম প্রকাশ না করে জমা দিন",
      your_name: "আপনার নাম",
      name_placeholder: "জন ডো",
      description_label: "বিবরণ",
      description_placeholder: "সমস্যাটি বিস্তারিতভাবে বর্ণনা করুন...",
      add_media: "মিডিয়া যোগ করুন",
      take_photo: "ছবি তুলুন",
      choose_file: "ফাইল নির্বাচন করুন",
      invalid_file_type: "অবৈধ ফাইল প্রকার",
      please_upload_valid_files:
        "দয়া করে JPEG, PNG, MP4, বা PDF ফাইল আপলোড করুন",
      file_too_large: "ফাইল খুব বড়",
      max_file_size: "সর্বোচ্চ ফাইলের আকার ১০ এমবি",
      add_location: "বর্তমান অবস্থান যোগ করুন",
      update_location: "অবস্থান আপডেট করুন",
      location_captured: "অবস্থান ধরা পড়েছে!",
      latitude: "অক্ষাংশ",
      longitude: "দ্রাঘিমাংশ",
      location_error: "অবস্থান ত্রুটি",
      enable_location: "দয়া করে অবস্থান পরিষেবা সক্ষম করুন",
      unsupported_feature: "অসমর্থিত বৈশিষ্ট্য",
      geolocation_unsupported: "জিওলোকেশন সমর্থিত নয়",
      missing_info: "তথ্য অনুপস্থিত",
      provide_description: "দয়া করে একটি বিবরণ প্রদান করুন",
      complaint_submitted: "অভিযোগ জমা দেওয়া হয়েছে!",
      category_label: "বিভাগ",
      complaint_received:
        "আমরা আপনার অভিযোগ গ্রহণ করেছি এবং শীঘ্রই এটি প্রক্রিয়া করব।",
      location_label: "অবস্থান",
      error: "ত্রুটি",
      submission_failed: "অভিযোগ জমা দিতে ব্যর্থ হয়েছে",
      submit_complaint: "অভিযোগ জমা দিন",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    detection: {
      order: ["localStorage", "navigator"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
