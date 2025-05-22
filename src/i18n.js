import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      // Navbar Menu Items
      Home: "Home",
      office_locations: "Office Locations",
      contact: "Contact",
      forgot_password: "Forgot Password",
      dashboard: "Dashboard",
      login: "Login",
      logout: "Logout",
      complaints: "Complaints",
      language: "Language",
      welcome_to_ccc: "Welcome to the Chittagong City Corporation",

      history: "History",
      no_history_available: "No history available",
      unauthorized_access: "You do not have permission to view this page.",
      only_employees_can_resolve: "Only employees can resolve complaints.",
      unauthorized: "Unauthorized",

      // Existing Login/Registration Translations
      complainant_login: "Login",
      admin_login: "Admin Login",
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
      press_kit: "Press Kit",
      copyright: "Copyright",
      all_rights_reserved: "All rights reserved by Chittagong City Corporation",
      innovated_by: "Innovated by",
      no_resolved_complaints: "No resolved complaints found",
      // SubmitComplaint Translations
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
      only_citizens_can_submit: "Only citizens can submit complaints",
      upload_media: "Please upload media.",
      select_ward: "Please select a ward.",
      ward_label: "Ward",

      error_fetch_users: "Failed to fetch users",
      error_fetch_complaints: "Failed to fetch complaints",
      others: "Others",
      viewed: "Viewed",
      assigned: "Assigned",
      ongoing: "Ongoing",
      resolved: "Resolved",
      error_update_complaint_status: "Failed to update complaint status",
      status_updated: "Status Updated",
      complaint_status_changed_to_assigned:
        "Complaint status changed to Assigned!",
      failed_to_update_complaint_status:
        "Failed to update complaint status. Please try again.",
      profile_alt: "Profile",
      welcome: "Welcome",
      admin: "Admin",
      manage_system_activity:
        "Manage system activity with ease and efficiency.",
      total_users: "Total Users",
      viewed_complaints: "Viewed",
      assigned_complaints: "Assigned",
      ongoing_complaints: "Ongoing",
      resolved_complaints: "Resolved",
      back_to_dashboard: "Back to Dashboard",
      serial: "Serial",
      title: "Title",
      status: "Status",
      actions: "Actions",
      view: "View",
      complaint_analytics: "Complaint Analytics",
      complaints_by_category: "Complaints by Category",
      no_category_data: "No category data available.",
      complaint_status_distribution: "Complaint Status Distribution",
      no_status_data: "No status data available.",
      pending: "Pending",
      complaint_status_changed_to_viewed: "Complaint status changed to Viewed!",

      mobile_label: "Mobile Number",
      mobile_placeholder: "Enter your mobile number (e.g., 1234567890)",
      provide_valid_mobile:
        "Please provide a valid mobile number (10-15 digits)",
      anonymous: "Anonymous",
      status_pending: "Pending",
      failed_to_submit_complaint: "Failed to submit complaint.",
      category_required: "Category is required",

      category_tab: "Category",
      view_map: "Map",

      // Dashboard Translations
      user_home: "Citizen Home",
      my_complaints: "Complaints",
      profile: "Profile",
      admin_home: "Admin Home",
      employee_home: "Employee Home",
      all_complaints: "All Complaints",
      ward_wise_view: "Ward Wise View",
      manage_users: "Manage Users",
      employees: "Employees",
      admin_dashboard: "Admin Dashboard",
      employee_dashboard: "Employee Dashboard",
      user_dashboard: "Citizen Dashboard",

      // Login Component Translations
      complainant_login_override: "Please Login",
      your_name_override: "Email",
      description_label_override: "Password",
      login_with_google: "Login with Google",
      dont_have_account: "Don’t have an account?",
      register: "Register",
      or: "OR",
      login_successful: "Login Successful",
      submit_complaint_override: "Login",
      name_placeholder_override: "Enter your email",
      description_placeholder_override: "Enter your password",
      logo_alt: "Jionex Logo",
      chattogram_city_corporation: "Chittagong City Corporation",
      grievance_portal: "Grievance Portal",
      welcome_to_grievance_portal: "Welcome to Grievance Portal",
      hide_password: "Hide password",
      show_password: "Show password",
      remember_me: "Remember Me On This Device",
      reset_email_sent: "Reset Email Sent",
      check_email_reset: "Check your email for a password reset link",
      reset_failed: "Failed to send reset email",
      reset_unavailable: "Password reset service unavailable",
      login_failed: "Login Failed",
      login_form: "Login form",
      technical_partner: "Technical Partner",
      send_reset_link: "Send Reset Link",

      manage_your_complaints: "Manage your complaints by status",

      status_viewed: "Viewed",
      status_assigned: "Assigned",
      status_ongoing: "Ongoing",
      status_resolved: "Resolved",
      complaint_id: "Complaint ID",

      description: "Description",
      file: "File",
      location: "Location",

      date: "Date",
      view_file: "View",
      na: "N/A",
      location_not_specified: "Not specified",
      location_invalid: "Invalid location",
      no_complaints: "No {status} complaints found",
      loading: "Loading...",

      manage_employees: "Manage Employees",
      add_employee: "Add Employee",
      add_new_employee: "Add New Employee",
      name: "Name",
      designation: "Designation",
      department: "Department",
      mobile: "Mobile",
      suspended: "Suspended",
      active: "Active",
      suspend: "Suspend",
      unsuspend: "Unsuspend",
      save: "Save",
      cancel: "Cancel",
      confirm_action: "Are you sure you want to {{action}} this employee?",
      suspend_text: "This will block the employee from accessing the system.",
      unsuspend_text: "This will restore the employee's access.",
      yes_suspend: "Yes, suspend!",
      yes_unsuspend: "Yes, unsuspend!",
      suspend_success: "Employee Suspended",
      unsuspend_success: "Employee Unsuspended",
      fail_suspend: "Failed to suspend employee. Please try again.",
      fail_unsuspend: "Failed to unsuspend employee. Please try again.",
      fetch_error: "Failed to fetch employees",
      add_error: "Failed to add employee. Please try again.",
      add_success: "The employee has been added successfully!",
      upload_error: "Failed to upload photo. Please try again.",

      name_required: "Name is required",
      designation_required: "Designation is required",
      mobile_required: "Mobile number is required",
      email_required: "Email is required",
      department_required: "Department is required",
      password_required: "Password is required",
      password_min_length: "Password must be at least 6 characters",
      password_placeholder: "Enter your password",

      please_login: "Please log in to view your complaints",
      failed_to_fetch_complaints: "Failed to fetch complaints",
      "category.Electricity": "Electricity",
      "category.Gas": "Gas",
      "category.Water & Sewerage": "Water & Sewerage",
      "category.Road & Infrastructure": "Road & Infrastructure",
      "category.Sanitation & Waste Management": "Sanitation & Waste Management",
      "category.Public Transport": "Public Transport",
      "category.Environment & Pollution": "Environment & Pollution",
      "category.Law & Order": "Law & Order",
      "category.Animal Control": "Animal Control",
      "category.Health & Medical": "Health & Medical",
      "category.The Sidewalk": "The Sidewalk",
      "category.Others": "Others",

      // SignUp Component Translations
      register_account: "Register an Account",
      full_name: "Full Name",
      email_address: "Email Address",
      email_placeholder: "Enter your email address",
      password: "Password",
      profile_information: "Profile Information",

      image_uploaded_successfully: "Profile photograph uploaded successfully",
      already_registered: "Already registered?",
      sign_in_with_google: "Sign In with Google",
      upload_profile_image: "Upload Profile Photograph",
      signup_form: "Registration Form",
      select_role: "Select Role",
      select_role_placeholder: "Select Role",
      citizen: "Citizen",
      administrative: "Administrative",
      employee: "Employee",

      ward_wise_complaints: "Ward-Wise Complaints",
      complaint: "Complaint",
      complaint_details: "Complaint Details",
      update_history: "Update History",
      sort_by: "Sort By",
      sort_none: "None",
      sort_category: "Category",
      sort_timestamp: "Timestamp",
      sort_descending: "Sort Descending",
      sort_ascending: "Sort Ascending",
      id: "ID",

      user_email: "User Email",
      created_at: "Created At",
      view_on_map: "View on Map",
      original_image: "Original Image",
      original_alt: "Original Image",
      update: "Update",
      updated_at: "Updated At",
      updated_image: "Updated Image",
      updated_image_alt: "Updated Image {{index}}",
      resolve: "Resolve",
      back: "Back",

      unknown_ward: "Unknown Ward",
      default_date: "1970-01-01",
      default_time: "00:00:00",
      fetch_complaints_error: "Failed to fetch complaints",
      invalid_date_error: "Invalid date",

      no_complaints_available: "No complaints available",
      back_to_wards: "Back to Wards",
      error_title: "Error",
      invalid_status_transition: "Invalid status transition",
      failed_update_status: "Failed to update status",
      status_updated_to_resolved: "Status updated to Resolved",

      role_required: "Role selection is required",
      registering: "Registering...",
      already_have_account: "Already have an account?",
      registration_successful: "Registration Successful!",
      profile_image: "Profile Image",

      welcome_back: "Welcome Back",
      dashboard_overview: "Here’s an overview of your dashboard",
      total_complaints: "Total Complaints",
      pending_reviews: "Pending Reviews",
      profile_completion: "Profile Completion",
      all_your_complaints: "All Your Complaints",
      hide: "Hide",
      show_all: "Show All",
      category_unknown: "Unknown Category",
      error_fetching_complaints: "Error fetching complaints",

      // Notice Translations
      notice_1: "We're Hiring: Data Analyst Needed!",
      notice_2: "New Feature: Digital Chattogram Platform Live Now!",
      notice_3: "Internship Opportunities Available – Apply Today!",
      notice_4: "Join the Green City Initiative: Plant a Tree!",
      notice_5: "Smart Traffic System Launching Soon – Stay Tuned!",
      notice_6: "Share Your Ideas: Public Feedback Portal Open!",
      notice_7: "Job Opening: Sustainability Specialist – Apply Now!",
      notice_8: "Workshop Alert: Learn About Smart City Technologies!",
      notice_9: "Emergency Services App Now Available – Download Today!",
      notice_10: "Follow Us on Social Media for Latest Updates!",

      // Welcome Translations
      welcome_title: "A Smart and Sustainable City",
      welcome_description:
        "Chattogram, the bustling port city of Bangladesh, is on a transformative journey to become a smart and sustainable urban hub. With its rich history, strategic location, and economic significance, Chattogram is embracing innovation, technology, and eco-friendly practices to enhance the quality of life for its residents and create a model city for the future.",
      welcome_image_alt: "Chattogram",

      welcome_employee: "Welcome",
      manage_tasks_message: "Manage your assigned tasks efficiently",
      profile_image_alt: "Profile Image",
      pending_complaints: "Pending",
      start: "Start",
      category_others: "Others",
      category_road: "Road",
      category_water: "Water",
      category_electricity: "Electricity",
      status_changed_to: "Complaint status changed to {status}",
      error_updating_complaint: "Error updating complaint",
      failed_to_update_complaint:
        "Failed to update complaint status. Please try again.",

      // Vision Translations
      vision_title: "Our Vision",
      vision_description:
        "To transform Chattogram into a globally recognized smart and sustainable city that leverages cutting-edge technology, promotes environmental stewardship, and ensures inclusive growth for all its citizens.",

      edit_complaint: "Edit Complaint",

      no_updated_image_available: "No Updated Image Available",

      photo: "Photo",
      choose_photo: "Choose Photo",

      add_update_description: "Add update description...",
      comment: "Comment",
      add_update_comment: "Add update comment...",

      no_viewed_complaints: "No viewed complaints",
      assigned_employee: "Assigned Employee",
      not_applicable: "Not Applicable",

      // MayorMessage Translations
      mayor_message_header: "A Message from the City Mayor",
      mayor_name: "Dr. Shahadat Hossain",
      mayor_title: "Honorable Mayor <br /> Chittagong City Corporation",
      mayor_message:
        '"Chattogram is not just a city; it is the heartbeat of Bangladesh\'s economy and a symbol of resilience and progress. As we embark on this ambitious journey to transform our city into a smart and sustainable urban center, I am committed to ensuring that every citizen benefits from this transformation. Together, we will build a city that is not only technologically advanced but also environmentally responsible and socially inclusive. Let us work hand in hand to create a brighter, greener, and smarter future for Chattogram."',
      mayor_image_alt: "Mayor",
      innovated_by_link_aria: "Visit Jionex website, innovated by",

      // ProgressSection Translations
      progress_title: "Chattogram’s Progress Under Leadership",
      progress_video1_title: "Dr. Shahadat Hossain’s Speech on Mosquito Spray",
      progress_video2_title:
        "Dr. Shahadat Hossain on City Corporation Politics",

      // KeyPillarsSection Translations
      key_pillars_title: "Key Pillars of Transformation",
      key_pillars: {
        smart_infrastructure: {
          title: "Smart Infrastructure",
          description:
            "Developing intelligent systems to improve urban living.",
          alt: "Smart Infrastructure",
          items: {
            item1:
              "Developing intelligent transportation systems to reduce traffic congestion and improve mobility.",
            item2:
              "Implementing smart grids for efficient energy management and distribution.",
            item3:
              "Building resilient and eco-friendly urban infrastructure to withstand climate challenges.",
          },
        },
        digital_innovation: {
          title: "Digital Innovation",
          description: "Leveraging technology for a smarter city.",
          alt: "Digital Innovation",
          items: {
            item1:
              "Establishing a city-wide digital network to enable real-time data collection and analysis.",
            item2:
              "Introducing e-governance platforms for transparent and efficient public services.",
            item3:
              "Promoting digital literacy and access to technology for all residents.",
          },
        },
        sustainable_environment: {
          title: "Sustainable Environment",
          description: "Creating a greener and cleaner urban ecosystem.",
          alt: "Sustainable Environment",
          items: {
            item1:
              "Expanding green spaces, parks, and urban forests to improve air quality and biodiversity.",
            item2:
              "Implementing waste management systems that prioritize recycling and reduce landfill dependency.",
            item3:
              "Encouraging the use of renewable energy sources like solar and wind power.",
          },
        },
        economic_growth: {
          title: "Economic Growth and Inclusivity",
          description: "Fostering a thriving and inclusive economy.",
          alt: "Economic Growth and Inclusivity",
          items: {
            item1:
              "Supporting local businesses and startups through innovation hubs and funding opportunities.",
            item2:
              "Creating job opportunities in emerging sectors like IT, green energy, and sustainable manufacturing.",
            item3:
              "Ensuring equitable access to resources and services for all communities.",
          },
        },
        resilient_planning: {
          title: "Resilient Urban Planning",
          description: "Designing cities to withstand future challenges.",
          alt: "Resilient Urban Planning",
          items: {
            item1:
              "Designing climate-resilient housing and infrastructure to address flooding and other natural disasters.",
            item2:
              "Promoting mixed-use developments to reduce urban sprawl and enhance community living.",
            item3:
              "Integrating smart water management systems to ensure sustainable water use.",
          },
        },
        licensing_system: {
          title: "Licensing System",
          description: "Simplifying and modernizing licensing processes.",
          alt: "Licensing System",
          items: {
            item1:
              "Streamlining the process for business licenses, vehicle registrations, and construction permits.",
            item2:
              "Introducing an online licensing portal for quick and hassle-free approvals.",
            item3:
              "Ensuring transparency and accountability in the licensing process to reduce corruption.",
          },
        },
        transportation_services: {
          title: "Transportation Services",
          description:
            "Revolutionizing urban mobility for a sustainable future.",
          alt: "Transportation Services",
          items: {
            item1:
              "Developing a modern, integrated public transportation system, including buses, trains, and ferries.",
            item2:
              "Introducing smart ticketing systems for seamless travel across different modes of transport.",
            item3:
              "Promoting eco-friendly transportation options like electric vehicles and bicycle-sharing programs.",
          },
        },
      },

      // Removed duplicate keys: welcome_back, dashboard_overview, total_complaints, pending_reviews, profile_completion, all_your_complaints, show_all, hide, error_fetching_complaints

      no_pending_complaints: "No pending complaints available.",

      none: "None",

      timestamp: "Timestamp",
      sort_asc: "Sort Ascending",
      sort_desc: "Sort Descending",

      basic_information: "Basic Information",
      ward_no: "Ward No",
      status_timeline: "Status & Timeline",
      submitted: "Submitted",

      no_description: "No description provided",
      attachments_location: "Attachments & Location",
      view_attached_file: "View Attached File",
      no_attachments: "No attachments",
      view_location_map: "View Location on Map",
      assign_complaint: "Assign Complaint",
      no_employees_available: "No employees available",
      close: "Close",
      enter_email: "Enter your email",

      failed_to_fetch_employees: "Failed to fetch employees",

      only_admin_can_change_status:
        "Only administrative users can change the status of complaints.",
      failed_to_update_status_to_viewed:
        "Failed to update complaint status to Viewed",

      status_changed_to_viewed: "Complaint status changed to Viewed!",
      only_admin_can_assign: "Only administrative users can assign complaints.",
      failed_to_assign_complaint: "Failed to assign complaint",

      complaint_assigned_success: "Complaint has been assigned successfully!",
      failed_to_update_status:
        "Failed to update complaint status. Please try again.",

      mark_as_resolved: "Mark as Resolved",
      back_to_ongoing_complaints: "Back to Ongoing Complaints",
      no_ongoing_complaints: "No Ongoing Complaints",

      error_fetch_employees: "Failed to fetch employees",

      only_employees_can_update_status:
        "Only employees can update complaint status",
      error_update_status: "Failed to update status",

      s_no: "S.No",

      no_assigned_complaints: "No assigned complaints",

      file_view: "File",

      back_to_assigned_complaints: "Back to Assigned Complaints",

      error_resolve_status: "Failed to resolve status",

      n_a: "N/A",

      assign: "Assign",
      select_employee: "Select Employee",

      back_to_viewed_complaints: "Back to Viewed Complaints",
      error_assign_status: "Failed to assign status",
      choose_category_below: "Choose a category below",
      error_fetching_data: "Error fetching data",

      fetch_user_data_error: "Failed to fetch user data",
      no_user_logged_in: "No user is logged in",

      unknown_user: "Unknown User",
      unknown_date: "Unknown Date",
      edit_profile: "Edit Profile",
      citizen_role: "Citizen",
      employee_role: "Employee",

      joined: "Joined",
      email: "Email",

      // OngoingProjects Translations
      ongoing_projects_title: "Ongoing Projects",
      ongoing_projects: {
        smart_traffic: {
          title: "Smart Traffic Management System",
          description:
            "Reducing congestion and improving road safety through AI-powered traffic control.",
        },
        green_city: {
          title: "Chattogram Green City Initiative",
          description:
            "Planting 1 million trees and creating urban green belts.",
        },
        renewable_energy: {
          title: "Renewable Energy Adoption",
          description:
            "Installing solar panels on public buildings and promoting rooftop solar for households.",
        },
        digital_platform: {
          title: "Digital Chattogram Platform",
          description:
            "A one-stop portal for citizens to access government services, pay bills, and report issues.",
        },
        properties_management: {
          title: "Properties Management",
          description:
            "Digitizing property records and enabling online management of land and real estate transactions.",
        },
        waste_management: {
          title: "Waste Management",
          description:
            "Implementing smart waste collection systems and promoting recycling initiatives to reduce landfill dependency.",
        },
        utility_services: {
          title: "Utility Services",
          description:
            "Upgrading water, electricity, and gas distribution networks to ensure reliable and efficient service delivery.",
        },
        infrastructure_maintenance: {
          title: "Infrastructure Maintenance",
          description:
            "Using IoT and AI to monitor and maintain roads, bridges, and public buildings for safety and longevity.",
        },
      },

      // GetInvolved Translations
      get_involved_title: "Get Involved",
      get_involved_description:
        "Transforming Chattogram into a smart and sustainable city is a collective effort. Here’s how you can contribute:",
      get_involved: {
        residents: {
          title: "Residents",
          description:
            "Adopt sustainable practices, participate in community programs, and stay informed about city initiatives.",
        },
        businesses: {
          title: "Businesses",
          description:
            "Invest in green technologies, support local innovation, and collaborate with the government on smart city projects.",
        },
        government_ngos: {
          title: "Government and NGOs",
          description:
            "Partner with stakeholders to implement policies and programs that drive sustainable development.",
        },
      },
      get_involved_image_alt: "Get Involved",

      // Footer Translations
      footer_contact_title: "Contact Us",
      footer_contact_description:
        "Have questions or ideas? We’d love to hear from you!",
      footer_contact: {
        email_label: "Email",
        phone_label: "Phone",
        address_label: "Address",
      },
      footer_copyright:
        "Copyright © {{year}} - All rights reserved by Chattogram City Corporation",
      phone_1: "02333388817",
      phone_2: "02333388818",
      phone_3: "02333388819",
      fax_number: "02333388803",
      nagar_bhaban: "Nagar Bhaban",
      logo_alt_ccc: "Chattogram City Corporation Logo",
      navigation_title: "Quick Link",

      batail_hill_tigerpass: "Batail Hill, Tigerpass, Chattogram",
      phone_label: "Phone",
      email_label: "Email",
      fax_label: "Fax",
      info_ccc_email: "info@ccc.gov.bd",
      programmer_ccc_email: "programmer@ccc.gov.bd",
      // EmployeeHome Translations

      manage_tasks: "Manage Tasks",

      navigate_to_all_complaints: "Navigate to All Complaints page",
      navigate_to_manage_tasks: "Navigate to Manage Tasks page",

      please_login_as_employee:
        "Please log in as an employee to access this page.",
      logout_successful: "Logout Successful",
      logout_failed: "Logout Failed",

      // Chatbot Translations
      chatbot_title: "Smart AI Chatbot",
      chatbot_initial_message: "Hello! How can I help you today?",
      chatbot_followup_message: "How are you?",
      chatbot_input_placeholder: "Type a message...",
      chatbot_input_label: "Chatbot message input",
      chatbot_input_description:
        "Enter your message to chat with the Smart AI Chatbot",
      chatbot_send_label: "Send message",
      chatbot_toggle_label: "Toggle chatbot",

      // Contact Translations
      contact_title: "Contact Us",
      contact_description:
        "Reach out to us for any inquiries or assistance. We're here to help you with our e-Services and more.",
      contact_form_heading: "Send Us a Message",
      contact_form: {
        name_placeholder: "Your Name",
        email_placeholder: "Your Email",
        subject_placeholder: "Subject",
        message_placeholder: "Your Message",
        name_label: "Your name",
        email_label: "Your email address",
        subject_label: "Message subject",
        message_label: "Your message",
      },
      contact_form_submit: "Submit",
      contact_form_submit_label: "Submit contact form",
      contact_form_success: "Your message has been sent successfully!",
      contact_info_heading: "Contact Information",
      contact_info: {
        phone_label: "Phone",
        email_label: "Email",
        address_label: "Address",
        phone_link_label: "Call our phone number",
        email_link_label: "Send us an email",
      },
      contact_map_title: "Map of Chattogram City Corporation",

      // Ward Translations
      "Select ward": "Select Ward",
      wards: {
        "Ward-1": "South Pahartali",
        "Ward-2": "Jalalabad",
        "Ward-3": "Panchlaish",
        "Ward-4": "Chandgaon",
        "Ward-5": "Mohra",
        "Ward-6": "East Madarbari",
        "Ward-7": "West Madarbari",
        "Ward-8": "Shulakbahar",
        "Ward-9": "North Pahartali",
        "Ward-10": "North Kattali",
        "Ward-11": "South Kattali",
        "Ward-12": "Saraipara",
        "Ward-13": "Pahartali",
        "Ward-14": "Lalkhan Bazar",
        "Ward-15": "Bagmoniram",
        "Ward-16": "Chakbazar",
        "Ward-17": "West Bakalia",
        "Ward-18": "East Bakalia",
        "Ward-19": "South Bakalia",
        "Ward-20": "Dewan Bazar",
        "Ward-21": "Jamalkhan",
        "Ward-22": "Enayet Bazar",
        "Ward-23": "North Pathantuli",
        "Ward-24": "North Agrabad",
        "Ward-25": "Rampur",
        "Ward-26": "North Halishahar",
        "Ward-27": "South Agrabad",
        "Ward-28": "Pathantuli",
        "Ward-29": "West Madarbari",
        "Ward-30": "East Madarbari",
        "Ward-31": "Alkaran",
        "Ward-32": "Andarkilla",
        "Ward-33": "Firingee Bazar",
        "Ward-34": "Patharghata",
        "Ward-35": "Boxirhat",
        "Ward-36": "Gosaildanga",
        "Ward-37": "North Middle Halishahar",
        "Ward-38": "South Middle Halishahar",
        "Ward-39": "South Halishahar",
        "Ward-40": "North Potenga",
        "Ward-41": "South Potenga",
      },

      // Additional General Translations

      no_data: "No data available",
      try_again: "Please try again",

      next: "Next",

      edit: "Edit",
      delete: "Delete",
      confirm: "Confirm",
      yes: "Yes",
      no: "No",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      clear: "Clear",
      download: "Download",
      print: "Print",
      help: "Help",
      faq: "FAQ",
      terms_of_service: "Terms of Service",
      privacy_policy: "Privacy Policy",
    },
  },
  bn: {
    translation: {
      // Navbar Menu Items
      Home: "হোম",
      office_locations: "অফিসের অবস্থান",
      contact: "যোগাযোগ",
      forgot_password: "পাসওয়ার্ড ভুলে গেছেন",
      dashboard: "ড্যাশবোর্ড",
      login: "লগইন",
      logout: "লগআউট",
      complaints: "অভিযোগ",
      language: "ভাষা",
      welcome_to_ccc: "চট্টগ্রাম সিটি কর্পোরেশনে স্বাগতম",

      // Existing Login/Registration Translations
      complainant_login: "লগইন",
      admin_login: "অ্যাডমিন লগইন",
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

      view_map: "মানচিত্র",
      about_us: "আমাদের সম্পর্কে",
      press_kit: "প্রেস কিট",
      copyright: "কপিরাইট",
      all_rights_reserved:
        "সকল অধিকার সংরক্ষিত চট্টগ্রাম সিটি কর্পোরেশনের দ্বারা",
      user_home: "নাগরিক হোম",
      my_complaints: "অভিযোগ",
      all_complaints: "সমস্ত অভিযোগ",
      viewed_complaints: "দেখা অভিযোগ",
      assigned_complaints: "নির্ধারিত অভিযোগ",
      ongoing_complaints: "চলমান অভিযোগ",
      resolved_complaints: "সমাধান হওয়া অভিযোগ",
      profile: "প্রোফাইল",
      admin_home: "অ্যাডমিন হোম",
      employee_home: "কর্মচারী হোম",
      ward_wise_view: "ওয়ার্ড অনুযায়ী দৃশ্য",
      manage_users: "ব্যবহারকারী ব্যবস্থাপনা",
      employees: "কর্মচারী",
      admin_dashboard: "অ্যাডমিন ড্যাশবোর্ড",
      employee_dashboard: "কর্মচারী ড্যাশবোর্ড",
      user_dashboard: "নাগরিক ড্যাশবোর্ড",
      home: "হোম",
      // SubmitComplaint Translations
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
      only_citizens_can_submit: "শুধুমাত্র নাগরিকরা অভিযোগ জমা দিতে পারেন",
      upload_media: "দয়া করে মিডিয়া আপলোড করুন।",
      select_ward: "দয়া করে একটি ওয়ার্ড নির্বাচন করুন।",
      ward_label: "ওয়ার্ড",

      error_fetch_users: "ব্যবহারকারীদের তথ্য আনতে ব্যর্থ হয়েছে",
      error_fetch_complaints: "অভিযোগগুলি আনতে ব্যর্থ হয়েছে",
      others: "অন্যান্য",
      viewed: "দেখা",
      assigned: "নির্ধারিত",
      ongoing: "চলমান",
      resolved: "সমাধান হয়েছে",
      error_update_complaint_status:
        "অভিযোগের স্ট্যাটাস আপডেট করতে ব্যর্থ হয়েছে",
      status_updated: "স্ট্যাটাস আপডেট হয়েছে",
      complaint_status_changed_to_assigned:
        "অভিযোগের স্ট্যাটাস নির্ধারিত হয়েছে!",
      failed_to_update_complaint_status:
        "অভিযোগের স্ট্যাটাস আপডেট করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
      profile_alt: "প্রোফাইল",
      welcome: "স্বাগতম",
      admin: "অ্যাডমিন",
      manage_system_activity:
        "সিস্টেমের কার্যক্রম সহজে এবং দক্ষতার সাথে পরিচালনা করুন।",
      total_users: "মোট ব্যবহারকারী",
      back_to_dashboard: "ড্যাশবোর্ডে ফিরে যান",
      serial: "ক্রমিক",
      title: "শিরোনাম",
      status: "স্ট্যাটাস",
      actions: "ক্রিয়াকলাপ",
      view: "দেখুন",
      complaint_analytics: "অভিযোগ বিশ্লেষণ",
      complaints_by_category: "বিভাগ অনুযায়ী অভিযোগ",
      no_category_data: "কোনো বিভাগের তথ্য নেই।",
      complaint_status_distribution: "অভিযোগের স্ট্যাটাস বিতরণ",
      no_status_data: "কোনো স্ট্যাটাস তথ্য নেই।",
      pending: "মুলতুবি",
      complaint_status_changed_to_viewed: "অভিযোগের স্ট্যাটাস দেখা হয়েছে!",

      // Login Component Translations
      complainant_login_override: "লগইন করুন",
      your_name_override: "ইমেইল",
      description_label_override: "পাসওয়ার্ড",
      login_with_google: "গুগল দিয়ে লগইন করুন",
      dont_have_account: "অ্যাকাউন্ট নেই?",
      register: "নিবন্ধন করুন",
      or: "অথবা",
      login_successful: "লগইন সফল",
      submit_complaint_override: "লগইন",
      name_placeholder_override: "আপনার ইমেইল লিখুন",
      description_placeholder_override: "আপনার পাসওয়ার্ড লিখুন",
      logo_alt: "জিওনেক্স লোগো",
      chattogram_city_corporation: "চট্টগ্রাম সিটি কর্পোরেশন",
      grievance_portal: "গ্রিভান্স পোর্টাল",
      welcome_to_grievance_portal: "গ্রিভান্স পোর্টালে স্বাগতম",
      hide_password: "পাসওয়ার্ড লুকান",
      show_password: "পাসওয়ার্ড দেখান",
      remember_me: "এই ডিভাইসে আমাকে মনে রাখুন",
      reset_email_sent: "রিসেট ইমেইল পাঠানো হয়েছে",
      check_email_reset: "পাসওয়ার্ড রিসেট লিঙ্কের জন্য আপনার ইমেইল চেক করুন",
      reset_failed: "রিসেট ইমেইল পাঠাতে ব্যর্থ হয়েছে",
      reset_unavailable: "পাসওয়ার্ড রিসেট পরিষেবা অনুপলব্ধ",
      login_failed: "লগইন ব্যর্থ",
      login_form: "লগইন ফর্ম",
      technical_partner: "প্রযুক্তিগত পার্টনার",

      sort_by: "ক্রমানুসারে",
      none: "কিছু না",

      timestamp: "সময় স্থান",
      sort_asc: "আরোহী ক্রম",
      sort_desc: "অবরোহী ক্রম",
      s_no: "ক্রমিক নং",
      ward_no: "ওয়ার্ড নম্বর",

      file_view: "ফাইল দেখুন",

      assign: "নিয়োগ",
      select_employee: "কর্মচারী নির্বাচন",

      error_fetch_employees: "কর্মচারী আনতে ব্যর্থ",
      error_update_status: "স্ট্যাটাস আপডেট করতে ব্যর্থ",

      complaint_details: "অভিযোগের বিস্তারিত",
      name: "নাম",
      description: "বিবরণ",
      location: "অবস্থান",
      view_file: "ফাইল দেখুন",
      back_to_viewed_complaints: "দেখা অভিযোগে ফিরে যান",
      error_assign_status: "স্ট্যাটাস নিয়োগ করতে ব্যর্থ",
      status_assigned: "স্ট্যাটাস নিয়োগ করা হয়েছে",

      welcome_back: "স্বাগতম ফিরে এসেছেন",
      dashboard_overview: "আপনার ড্যাশবোর্ডের সারসংক্ষেপ এখানে",
      total_complaints: "মোট অভিযোগ",
      pending_reviews: "বিচারাধীন অভিযোগ",
      profile_completion: "প্রোফাইল সম্পূর্ণতা",
      all_your_complaints: "আপনার সমস্ত অভিযোগ",
      hide: "লুকান",
      show_all: "সব দেখান",
      complaint_id: "অভিযোগ আইডি",
      file: "ফাইল",
      date: "তারিখ",
      na: "প্রযোজ্য নয়",
      location_not_specified: "অবস্থান নির্দিষ্ট করা হয়নি",
      location_invalid: "অবৈধ অবস্থান",
      category_unknown: "অজানা বিভাগ",
      status_pending: "অপেক্ষমাণ",
      status_ongoing: "চলমান",
      status_resolved: "সমাধান হয়েছে",
      failed_to_fetch_complaints: "অভিযোগ আনতে ব্যর্থ হয়েছে",
      error_fetching_complaints: "অভিযোগ আনার সময় ত্রুটি",
      loading: "লোড হচ্ছে...",
      "category.road": "রাস্তা",
      "category.water": "পানি",
      "category.electricity": "বিদ্যুৎ",

      // SignUp Component Translations
      register_account: "একটি অ্যাকাউন্ট নিবন্ধন করুন",
      full_name: "পূর্ণ নাম",
      email_address: "ইমেইল ঠিকানা",
      email_placeholder: "আপনার ইমেইল ঠিকানা লিখুন",
      password: "পাসওয়ার্ড",
      password_placeholder: "আপনার পাসওয়ার্ড লিখুন",
      password_required: "অনুগ্রহ করে একটি পাসওয়ার্ড লিখুন",
      password_min_length: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর লম্বা হতে হবে",
      image_uploaded_successfully: "প্রোফাইল ছবি সফলভাবে আপলোড করা হয়েছে",
      already_registered: "ইতিমধ্যে নিবন্ধিত?",
      sign_in_with_google: "গুগল দিয়ে সাইন ইন করুন",
      upload_profile_image: "প্রোফাইল ছবি আপলোড করুন",
      signup_form: "নিবন্ধন ফর্ম",
      select_role: "ভূমিকা নির্বাচন করুন",
      select_role_placeholder: "ভূমিকা নির্বাচন করুন",
      citizen: "নাগরিক",
      administrative: "প্রশাসনিক",
      employee: "কর্মচারী",
      name_required: "নাম আবশ্যক",
      email_required: "ইমেইল আবশ্যক",
      role_required: "ভূমিকা নির্বাচন আবশ্যক",
      registering: "নিবন্ধন হচ্ছে...",
      already_have_account: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
      registration_successful: "নিবন্ধন সফল!",
      profile_image: "প্রোফাইল ছবি",

      history: "ইতিহাস",
      no_history_available: "কোনো ইতিহাস উপলব্ধ নেই",

      // Notice Translations
      notice_1: "আমরা নিয়োগ করছি: ডেটা বিশ্লেষক প্রয়োজন!",
      notice_2: "নতুন ফিচার: ডিজিটাল চট্টগ্রাম প্ল্যাটফর্ম এখন চালু!",
      notice_3: "ইন্টার্নশিপ সুযোগ উপলব্ধ – আজই আবেদন করুন!",
      notice_4: "গ্রিন সিটি উদ্যোগে যোগ দিন: একটি গাছ লাগান!",
      notice_5: "স্মার্ট ট্রাফিক সিস্টেম শীঘ্রই চালু হচ্ছে – অপেক্ষা করুন!",
      notice_6: "আপনার ধারণা শেয়ার করুন: পাবলিক ফিডব্যাক পোর্টাল খোলা!",
      notice_7: "চাকরির সুযোগ: সাসটেইনেবিলিটি বিশেষজ্ঞ – এখন আবেদন করুন!",
      notice_8: "ওয়ার্কশপ সতর্কতা: স্মার্ট সিটি প্রযুক্তি সম্পর্কে জানুন!",
      notice_9: "জরুরি সেবা অ্যাপ এখন উপলব্ধ – আজই ডাউনলোড করুন!",
      notice_10: "সর্বশেষ আপডেটের জন্য আমাদের সোশ্যাল মিডিয়ায় ফলো করুন!",

      // Welcome Translations
      welcome_title: "একটি স্মার্ট এবং টেকসই শহর",
      welcome_description:
        "চট্টগ্রাম, বাংলাদেশের ব্যস্ত বন্দর শহর, একটি স্মার্ট এবং টেকসই নগর কেন্দ্র হওয়ার জন্য একটি রূপান্তরকারী যাত্রায় রয়েছে। এর সমৃদ্ধ ইতিহাস, কৌশলগত অবস্থান এবং অর্থনৈতিক গুরুত্ব সহ, চট্টগ্রাম উদ্ভাবন, প্রযুক্তি এবং পরিবেশ-বান্ধব অনুশীলন গ্রহণ করছে যাতে বাসিন্দাদের জীবনমান উন্নত হয় এবং ভবিষ্যতের জন্য একটি মডেল শহর তৈরি হয়।",
      welcome_image_alt: "চট্টগ্রাম",

      // Vision Translations
      vision_title: "আমাদের দৃষ্টিভঙ্গি",
      vision_description:
        "চট্টগ্রামকে বিশ্বব্যাপী স্বীকৃত একটি স্মার্ট এবং টেকসই শহরে রূপান্তর করা, যা অত্যাধুনিক প্রযুক্তি ব্যবহার করে, পরিবেশ সংরক্ষণকে উৎসাহিত করে এবং এর সকল নাগরিকের জন্য সমান্তরাল উন্নয়ন নিশ্চিত করে।",
      innovated_by: "উদ্ভাবিত",
      // MayorMessage Translations
      mayor_message_header: "নগর মেয়রের বার্তা",
      mayor_name: "ড. শাহাদাত হোসেন",
      mayor_title: "সম্মানিত মেয়র <br /> চট্টগ্রাম সিটি কর্পোরেশন",
      mayor_message:
        '"চট্টগ্রাম শুধু একটি শহর নয়; এটি বাংলাদেশের অর্থনীতির হৃদস্পন্দন এবং স্থিতিস্থাপকতা ও অগ্রগতির প্রতীক। আমরা আমাদের শহরকে একটি স্মার্ট এবং টেকসই নগর কেন্দ্রে রূপান্তরিত করার এই উচ্চাভিলাষী যাত্রায় যাত্রা শুরু করেছি, আমি প্রতিশ্রুতিবদ্ধ যে প্রতিটি নাগরিক এই রূপান্তর থেকে উপকৃত হবে। একসাথে, আমরা এমন একটি শহর গড়ে তুলব যা কেবল প্রযুক্তিগতভাবে উন্নত নয়, পরিবেশগতভাবে দায়িত্বশীল এবং সামাজিকভাবে অন্তর্ভুক্তিমূলক। আসুন আমরা হাতে হাত রেখে চট্টগ্রামের জন্য একটি উজ্জ্বল, সবুজ এবং স্মার্ট ভবিষ্যত গড়ে তুলি।"',
      mayor_image_alt: "মেয়র",

      unauthorized_access: "আপনার এই পৃষ্ঠা দেখার অনুমতি নেই।",
      only_employees_can_resolve:
        "শুধুমাত্র কর্মচারীরা অভিযোগ সমাধান করতে পারে।",
      unauthorized: "অননুমোদিত",

      basic_information: "মৌলিক তথ্য",

      status_timeline: "অবস্থা ও সময়রেখা",
      submitted: "জমা দেওয়া হয়েছে",

      fetch_user_data_error: "ইউজারের ডেটা আনতে ব্যর্থ হয়েছে",
      no_user_logged_in: "কোনো ইউজার লগইন করেনি",

      unknown_user: "অজানা ব্যবহারকারী",
      unknown_date: "অজানা তারিখ",

      edit_profile: "প্রোফাইল সম্পাদনা করুন",
      citizen_role: "নাগরিক",
      employee_role: "কর্মচারী",

      joined: "যোগদান করেছেন",
      email: "ইমেইল",

      ward_wise_complaints: "ওয়ার্ডভিত্তিক অভিযোগ",
      complaint: "অভিযোগ",

      update_history: "আপডেট ইতিহাস",

      sort_none: "কোনটি না",
      sort_category: "শ্রেণী",
      sort_timestamp: "সময়",
      sort_descending: "নিম্নক্রমে সাজান",
      sort_ascending: "উর্ধ্বক্রমে সাজান",
      id: "আইডি",

      user_email: "ব্যবহারকারীর ইমেইল",
      created_at: "তৈরির সময়",
      view_on_map: "মানচিত্রে দেখুন",
      original_image: "মূল ছবি",
      original_alt: "মূল ছবি",
      update: "আপডেট",
      updated_at: "আপডেট সময়",
      updated_image: "আপডেট ছবি",
      updated_image_alt: "আপডেট ছবি {{index}}",
      resolve: "সমাধান করুন",
      back: "ফিরে যান",

      unknown_ward: "অজানা ওয়ার্ড",
      default_date: "১৯৭০-০১-০১",
      default_time: "০০:০০:০০",
      fetch_complaints_error: "অভিযোগ আনতে ব্যর্থ হয়েছে",
      invalid_date_error: "অবৈধ তারিখ",

      no_complaints_available: "কোনো অভিযোগ পাওয়া যায়নি",
      back_to_wards: "ওয়ার্ড তালিকায় ফিরে যান",
      error_title: "ত্রুটি",
      invalid_status_transition: "অবৈধ অবস্থা পরিবর্তন",
      failed_update_status: "অবস্থা আপডেট করতে ব্যর্থ হয়েছে",
      status_updated_to_resolved: "অবস্থা 'সমাধান হয়েছে' এ আপডেট হয়েছে",

      no_description: "কোনো বর্ণনা দেওয়া হয়নি",
      attachments_location: "সংযুক্তি ও অবস্থান",
      view_attached_file: "সংযুক্ত ফাইল দেখুন",
      no_attachments: "কোনো সংযুক্তি নেই",
      view_location_map: "মানচিত্রে অবস্থান দেখুন",
      assign_complaint: "অভিযোগ নিয়োগ করুন",
      no_employees_available: "কোনো কর্মী উপলব্ধ নেই",
      close: "বন্ধ করুন",

      failed_to_fetch_employees: "কর্মীদের তথ্য আনতে ব্যর্থ",

      only_admin_can_change_status:
        "শুধুমাত্র প্রশাসনিক ব্যবহারকারীরা অভিযোগের অবস্থা পরিবর্তন করতে পারেন।",
      failed_to_update_status_to_viewed:
        "অভিযোগের অবস্থা দেখা হয়েছে তে আপডেট করতে ব্যর্থ",

      status_changed_to_viewed:
        "অভিযোগের অবস্থা দেখা হয়েছে তে পরিবর্তিত হয়েছে!",
      only_admin_can_assign:
        "শুধুমাত্র প্রশাসনিক ব্যবহারকারীরা অভিযোগ নিয়োগ করতে পারেন।",
      failed_to_assign_complaint: "অভিযোগ নিয়োগ করতে ব্যর্থ",

      complaint_assigned_success: "অভিযোগ সফলভাবে নিয়োগ করা হয়েছে!",
      failed_to_update_status:
        "অভিযোগের অবস্থা আপডেট করতে ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।",

      status_viewed: "দেখা হয়েছে",

      edit_complaint: "অভিযোগ সম্পাদনা করুন",

      no_updated_image_available: "কোনো আপডেট ছবি নেই",

      photo: "ছবি",
      choose_photo: "ছবি নির্বাচন করুন",

      add_update_description: "আপডেট বিবরণ যোগ করুন...",
      comment: "মন্তব্য",
      add_update_comment: "আপডেট মন্তব্য যোগ করুন...",

      no_viewed_complaints: "কোনো দেখা অভিযোগ নেই",
      assigned_employee: "নিযুক্ত কর্মচারী",
      not_applicable: "প্রযোজ্য নয়",

      // ProgressSection Translations
      progress_title: "নেতৃত্বে চট্টগ্রামের অগ্রগতি",
      progress_video1_title:
        "এমন কোন স্প্রে আমি চাইনা যা দিলে মশা লাফ দিয়ে উঠে যাবে: ডাঃ শাহাদাত হোসেন",
      progress_video2_title:
        "সিটি করপোরেশনে রাজনীতির আলাপ নিয়ে আসবেন না : ডাঃ শাহাদাত হোসেন",

      manage_employees: "কর্মচারী ব্যবস্থাপনা",
      add_employee: "কর্মচারী যোগ করুন",
      add_new_employee: "নতুন কর্মচারী যোগ করুন",
      designation: "পদবী",
      department: "বিভাগ",
      mobile: "মোবাইল",
      suspended: "বহিষ্কৃত",
      active: "সক্রিয়",
      suspend: "বহিষ্কার করুন",
      unsuspend: "পুনরায় সক্রিয় করুন",
      save: "সংরক্ষণ করুন",
      cancel: "বাতিল করুন",
      confirm_action:
        "আপনি কি নিশ্চিত যে আপনি এই কর্মচারীকে {{action}} করতে চান?",
      suspend_text: "এটি কর্মচারীকে সিস্টেমে প্রবেশ করতে বাধা দেবে।",
      unsuspend_text: "এটি কর্মচারীর অ্যাক্সেস পুনরায় চালু করবে।",
      yes_suspend: "হ্যাঁ, বহিষ্কার করুন!",
      yes_unsuspend: "হ্যাঁ, পুনরায় সক্রিয় করুন!",
      suspend_success: "কর্মচারীকে বহিষ্কার করা হয়েছে",
      unsuspend_success: "কর্মচারীকে পুনরায় সক্রিয় করা হয়েছে",
      fail_suspend:
        "কর্মচারীকে বহিষ্কার করতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
      fail_unsuspend:
        "কর্মচারীকে পুনরায় সক্রিয় করতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
      fetch_error: "কর্মচারীদের তথ্য আনতে ব্যর্থ হয়েছে",
      add_error:
        "কর্মচারী যোগ করতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
      add_success: "কর্মচারী সফলভাবে যোগ করা হয়েছে!",
      upload_error:
        "ছবি আপলোড করতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",

      send_reset_link: "পাসওয়ার্ড রিসেট লিংক পাঠান",
      enter_email: "আপনার ইমেইল দিন",

      // KeyPillarsSection Translations
      key_pillars_title: "রূপান্তরের মূল স্তম্ভ",
      key_pillars: {
        smart_infrastructure: {
          title: "স্মার্ট অবকাঠামো",
          description: "নগর জীবন উন্নত করতে বুদ্ধিমান সিস্টেম উন্নয়ন।",
          alt: "স্মার্ট অবকাঠামো",
          items: {
            item1:
              "ট্রাফিক জটিলতা কমাতে এবং গতিশীলতা উন্নত করতে বুদ্ধিমান পরিবহন সিস্টেম উন্নয়ন।",
            item2:
              "দক্ষ শক্তি ব্যবস্থাপনা এবং বিতরণের জন্য স্মার্ট গ্রিড বাস্তবায়ন।",
            item3:
              "জলবায়ু চ্যালেঞ্জ সহ্য করার জন্য স্থিতিস্থাপক এবং পরিবেশ-বান্ধব নগর অবকাঠামো নির্মাণ।",
          },
        },
        digital_innovation: {
          title: "ডিজিটাল উদ্ভাবন",
          description: "একটি স্মার্ট শহরের জন্য প্রযুক্তি ব্যবহার।",
          alt: "ডিজিটাল উদ্ভাবন",
          items: {
            item1:
              "রিয়েল-টাইম ডেটা সংগ্রহ এবং বিশ্লেষণ সক্ষম করতে শহর-ব্যাপী ডিজিটাল নেটওয়ার্ক স্থাপন।",
            item2:
              "স্বচ্ছ এবং দক্ষ পাবলিক সার্ভিসের জন্য ই-গভর্নেন্স প্ল্যাটফর্ম প্রবর্তন।",
            item3:
              "সকল বাসিন্দার জন্য ডিজিটাল সাক্ষরতা এবং প্রযুক্তি অ্যাক্সেস প্রচার।",
          },
        },
        sustainable_environment: {
          title: "টেকসই পরিবেশ",
          description: "একটি সবুজ এবং পরিষ্কার নগর ইকোসিস্টেম তৈরি।",
          alt: "টেকসই পরিবেশ",
          items: {
            item1:
              "বায়ুর গুণমান এবং জীববৈচিত্র্য উন্নত করতে সবুজ স্থান, পার্ক এবং নগর বন সম্প্রসারণ।",
            item2:
              "পুনর্ব্যবহারকে অগ্রাধিকার দেয় এবং ল্যান্ডফিল নির্ভরতা কমায় এমন বর্জ্য ব্যবস্থাপনা সিস্টেম বাস্তবায়ন।",
            item3:
              "সৌর এবং বায়ু শক্তির মতো নবায়নযোগ্য শক্তির উৎস ব্যবহার উৎসাহিত করা।",
          },
        },
        economic_growth: {
          title: "অর্থনৈতিক প্রবৃদ্ধি এবং অন্তর্ভুক্তি",
          description: "একটি সমৃদ্ধ এবং অন্তর্ভুক্তিমূলক অর্থনীতি গড়ে তোলা।",
          alt: "অর্থনৈতিক প্রবৃদ্ধি এবং অন্তর্ভুক্তি",
          items: {
            item1:
              "উদ্ভাবন হাব এবং অর্থায়নের সুযোগের মাধ্যমে স্থানীয় ব্যবসা এবং স্টার্টআপ সমর্থন।",
            item2:
              "আইটি, সবুজ শক্তি এবং টেকসই উৎপাদনের মতো উদীয়মান খাতে চাকরির সুযোগ সৃষ্টি।",
            item3:
              "সকল সম্প্রদায়ের জন্য সম্পদ এবং পরিষেবার ন্যায়সঙ্গত অ্যাক্সেস নিশ্চিত করা।",
          },
        },
        resilient_planning: {
          title: "স্থিতিস্থাপক নগর পরিকল্পনা",
          description: "ভবিষ্যতের চ্যালেঞ্জ মোকাবিলার জন্য শহর ডিজাইন।",
          alt: "স্থিতিস্থাপক নগর পরিকল্পনা",
          items: {
            item1:
              "বন্যা এবং অন্যান্য প্রাকৃতিক দুর্যোগ মোকাবিলার জন্য জলবায়ু-স্থিতিস্থাপক আবাসন এবং অবকাঠামো ডিজাইন।",
            item2:
              "নগর বিস্তৃতি কমাতে এবং সম্প্রদায় জীবনযাত্রা উন্নত করতে মিশ্র-ব্যবহার উন্নয়ন প্রচার।",
            item3:
              "টেকসই জল ব্যবহার নিশ্চিত করতে স্মার্ট জল ব্যবস্থাপনা সিস্টেম সংহত করা।",
          },
        },
        licensing_system: {
          title: "লাইসেন্সিং সিস্টেম",
          description: "লাইসেন্সিং প্রক্রিয়া সরলীকরণ এবং আধুনিকীকরণ।",
          alt: "লাইসেন্সিং সিস্টেম",
          items: {
            item1:
              "ব্যবসায়িক লাইসেন্স, যানবাহন নিবন্ধন এবং নির্মাণ পারমিটের জন্য প্রক্রিয়া স্ট্রিমলাইন।",
            item2:
              "দ্রুত এবং ঝামেলা-মুক্ত অনুমোদনের জন্য অনলাইন লাইসেন্সিং পোর্টাল প্রবর্তন।",
            item3:
              "দুর্নীতি কমাতে লাইসেন্সিং প্রক্রিয়ায় স্বচ্ছতা এবং জবাবদিহিতা নিশ্চিত করা।",
          },
        },
        transportation_services: {
          title: "পরিবহন পরিষেবা",
          description: "টেকসই ভবিষ্যতের জন্য নগর গতিশীলতা বিপ্লব।",
          alt: "পরিবহন পরিষেবা",
          items: {
            item1:
              "বাস, ট্রেন এবং ফেরি সহ আধুনিক, সমন্বিত পাবলিক পরিবহন সিস্টেম উন্নয়ন।",
            item2:
              "বিভিন্ন পরিবহন মাধ্যমে নির্বিঘ্ন ভ্রমণের জন্য স্মার্ট টিকিটিং সিস্টেম প্রবর্তন।",
            item3:
              "ইলেকট্রিক যানবাহন এবং সাইকেল-শেয়ারিং প্রোগ্রামের মতো পরিবেশ-বান্ধব পরিবহন বিকল্প প্রচার।",
          },
        },
      },

      no_assigned_complaints: "কোনো নির্ধারিত অভিযোগ নেই",

      back_to_assigned_complaints: "নির্ধারিত অভিযোগে ফিরে যান",

      error_resolve_status: "স্ট্যাটাস সমাধান করতে ব্যর্থ",

      n_a: "N/A",

      pending_complaints: "মুলতুবি",

      mobile_label: "মোবাইল নম্বর",
      mobile_placeholder: "আপনার মোবাইল নম্বর লিখুন (যেমন, ১২৩৪৫৬৭৮৯০)",
      provide_valid_mobile:
        "অনুগ্রহ করে একটি বৈধ মোবাইল নম্বর প্রদান করুন (১০-১৫ সংখ্যা)",
      anonymous: "বেনামী",

      failed_to_submit_complaint: "অভিযোগ জমা দিতে ব্যর্থ।",
      category_required: "বিভাগ প্রয়োজন",

      sort_none: "কোনোটি নয়",

      no_resolved_complaints: "কোনো সমাধানকৃত অভিযোগ পাওয়া যায়নি",

      mark_as_resolved: "সমাধান হিসেবে চিহ্নিত করুন",
      back_to_ongoing_complaints: "চলমান অভিযোগে ফিরে যান",
      no_ongoing_complaints: "কোনো চলমান অভিযোগ নেই",

      only_employees_can_update_status:
        "শুধুমাত্র কর্মচারীরা অভিযোগের অবস্থা আপডেট করতে পারেন",

      status_updated_to_resolved: "অবস্থা সমাধান হিসেবে আপডেট হয়েছে",

      // EmployeeHome Translations

      category_tab: "বিভাগ",

      user_default: "ব্যবহারকারী",

      mobile_required: "মোবাইল নম্বর আবশ্যক",
      department_required: "বিভাগ আবশ্যক",

      "category.Electricity": "বিদ্যুত",
      "category.Gas": "গ্যাস",
      "category.Water & Sewerage": "পানি ও স্যুয়ারেজ",
      "category.Road & Infrastructure": "রাস্তা ও অবকাঠামো",
      "category.Sanitation & Waste Management":
        "স্বাস্থ্যকরতা ও কচরা ব্যবস্থাপনা",
      "category.Public Transport": "পাবলিক পরিবহন",
      "category.Environment & Pollution": "পরিবেশ ও দূষণ",
      "category.Law & Order": "আইন ও কানুন",
      "category.Animal Control": "প্রাণী নিয়ন্ত্রণ",
      "category.Health & Medical": "স্বাস্থ্য ও চিকিৎসা",
      "category.The Sidewalk": "পায়ে হাঁটা পথ",
      "category.Others": "অন্যান্য",

      welcome_employee: "স্বাগত",

      manage_tasks_message: "আপনার অভিযোগগুলি পরিচালনা করুন",

      manage_tasks: "কার্য পরিচালনা",

      navigate_to_all_complaints: "সব অভিযোগ পৃষ্ঠায় যান",
      navigate_to_manage_tasks: "কার্য পরিচালনা পৃষ্ঠায় যান",

      please_login_as_employee:
        "এই পৃষ্ঠায় প্রবেশ করতে দয়া করে একজন কর্মচারী হিসেবে লগ ইন করুন।",
      logout_successful: "লগ আউট সফল",
      logout_failed: "লগ আউট ব্যর্থ",

      choose_category_below: "নিচে একটি বিভাগ নির্বাচন করুন",

      error_fetching_data: "তথ্য সংগ্রহে ত্রুটি",

      manage_your_complaints: "অবস্থা অনুযায়ী আপনার অভিযোগগুলি পরিচালনা করুন",

      no_complaints: "কোনো {status} অভিযোগ পাওয়া যায়নি",

      please_login: "আপনার অভিযোগ দেখতে অনুগ্রহ করে লগইন করুন",

      view_on_map: "মানচিত্রে দেখুন",

      // OngoingProjects Translations
      ongoing_projects_title: "চলমান প্রকল্প",
      ongoing_projects: {
        smart_traffic: {
          title: "স্মার্ট ট্রাফিক ব্যবস্থাপনা সিস্টেম",
          description:
            "এআই-চালিত ট্রাফিক নিয়ন্ত্রণের মাধ্যমে জটিলতা হ্রাস এবং রাস্তার নিরাপত্তা উন্নতি।",
        },
        green_city: {
          title: "চট্টগ্রাম গ্রিন সিটি উদ্যোগ",
          description: "১০ লক্ষ গাছ রোপণ এবং নগর সবুজ বেল্ট তৈরি।",
        },
        renewable_energy: {
          title: "নবায়নযোগ্য শক্তি গ্রহণ",
          description:
            "পাবলিক ভবনগুলিতে সোলার প্যানেল স্থাপন এবং গৃহস্থালির জন্য ছাদে সোলার প্রচার।",
        },
        digital_platform: {
          title: "ডিজিটাল চট্টগ্রাম প্ল্যাটফর্ম",
          description:
            "নাগরিকদের জন্য সরকারি পরিষেবা, বিল পরিশোধ এবং সমস্যা রিপোর্ট করার জন্য একটি একক পোর্টাল।",
        },
        properties_management: {
          title: "সম্পত্তি ব্যবস্থাপনা",
          description:
            "সম্পত্তির রেকর্ড ডিজিটাইজ করা এবং জমি ও রিয়েল এস্টেট লেনদেনের অনলাইন ব্যবস্থাপনা সক্ষম করা।",
        },
        waste_management: {
          title: "বর্জ্য ব্যবস্থাপনা",
          description:
            "স্মার্ট বর্জ্য সংগ্রহ সিস্টেম বাস্তবায়ন এবং ল্যান্ডফিল নির্ভরতা কমাতে পুনর্ব্যবহার উদ্যোগ প্রচার।",
        },
        utility_services: {
          title: "ইউটিলিটি পরিষেবা",
          description:
            "নির্ভরযোগ্য এবং দক্ষ পরিষেবা প্রদানের জন্য পানি, বিদ্যুৎ এবং গ্যাস বিতরণ নেটওয়ার্ক আপগ্রেড।",
        },
        infrastructure_maintenance: {
          title: "অবকাঠামো রক্ষণাবেক্ষণ",
          description:
            "নিরাপত্তা এবং দীর্ঘায়ুর জন্য রাস্তা, সেতু এবং পাবলিক ভবন পর্যবেক্ষণ এবং রক্ষণাবেক্ষণের জন্য আইওটি এবং এআই ব্যবহার।",
        },
      },

      // GetInvolved Translations
      get_involved_title: "অংশগ্রহণ করুন",
      get_involved_description:
        "চট্টগ্রামকে একটি স্মার্ট এবং টেকসই শহরে রূপান্তর করা একটি সম্মিলিত প্রচেষ্টা। আপনি কীভাবে অবদান রাখতে পারেন তা এখানে:",
      get_involved: {
        residents: {
          title: "বাসিন্দা",
          description:
            "টেকসই অনুশীলন গ্রহণ করুন, সম্প্রদায়ের কর্মসূচিতে অংশগ্রহণ করুন এবং শহরের উদ্যোগ সম্পর্কে অবগত থাকুন।",
        },
        businesses: {
          title: "ব্যবসা",
          description:
            "সবুজ প্রযুক্তিতে বিনিয়োগ করুন, স্থানীয় উদ্ভাবন সমর্থন করুন এবং স্মার্ট সিটি প্রকল্পে সরকারের সাথে সহযোগিতা করুন।",
        },
        government_ngos: {
          title: "সরকার এবং এনজিও",
          description:
            "টেকসই উন্নয়ন চালিত নীতি এবং কর্মসূচি বাস্তবায়নের জন্য স্টেকহোল্ডারদের সাথে অংশীদারিত্ব করুন।",
        },
      },
      get_involved_image_alt: "অংশগ্রহণ করুন",

      // Footer Translations
      footer_contact_title: "যোগাযোগ করুন",
      footer_contact_description:
        "প্রশ্ন বা ধারণা আছে? আমরা আপনার কাছ থেকে শুনতে চাই!",
      footer_contact: {
        email_label: "ইমেইল",
        phone_label: "ফোন",
        address_label: "ঠিকানা",
      },
      phone_1: "০২৩৩৩৩৮৮৮১৭",
      phone_2: "০২৩৩৩৩৮৮৮১৮",
      phone_3: "০২৩৩৩৩৮৮৮১৯",
      fax_number: "০২৩৩৩৩৮৮৮০৩",
      nagar_bhaban: "নগর ভবন",
      footer_copyright:
        "কপিরাইট © {{year}} - সকল অধিকার সংরক্ষিত চট্টগ্রাম সিটি কর্পোরেশনের দ্বারা",
      logo_alt_ccc: "চট্টগ্রাম সিটি কর্পোরেশন লোগো",
      navigation_title: "দ্রুত লিঙ্ক",

      batail_hill_tigerpass: "বাটালি হিল, টাইগারপাস, চট্টগ্রাম",
      phone_label: "ফোন",
      email_label: "ইমেইল",
      fax_label: "ফ্যাক্স",
      info_ccc_email: "info@ccc.gov.bd",
      programmer_ccc_email: "programmer@ccc.gov.bd",

      innovated_by_link_aria: "জিওনেক্স ওয়েবসাইট দেখুন, উদ্ভাবিত",

      // Chatbot Translations
      chatbot_title: "স্মার্ট এআই চ্যাটবট",
      chatbot_initial_message:
        "হ্যালো! আমি আজ আপনাকে কীভাবে সাহায্য করতে পারি?",
      chatbot_followup_message: "আপনি কেমন আছেন?",
      chatbot_input_placeholder: "একটি বার্তা টাইপ করুন...",
      chatbot_input_label: "চ্যাটবট বার্তা ইনপুট",
      chatbot_input_description:
        "স্মার্ট এআই চ্যাটবটের সাথে চ্যাট করতে আপনার বার্তা লিখুন",
      chatbot_send_label: "বার্তা পাঠান",
      chatbot_toggle_label: "চ্যাটবট টগল করুন",

      // Contact Translations
      contact_title: "যোগাযোগ করুন",
      contact_description:
        "যেকোনো জিজ্ঞাসা বা সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন। আমরা আমাদের ই-সেবা এবং আরও অনেক কিছু নিয়ে আপনাকে সাহায্য করতে এখানে আছি।",
      contact_form_heading: "আমাদের একটি বার্তা পাঠান",
      contact_form: {
        name_placeholder: "আপনার নাম",
        email_placeholder: "আপনার ইমেইল",
        subject_placeholder: "বিষয়",
        message_placeholder: "আপনার বার্তা",
        name_label: "আপনার নাম",
        email_label: "আপনার ইমেইল ঠিকানা",
        subject_label: "বার্তার বিষয়",
        message_label: "আপনার বার্তা",
      },
      contact_form_submit: "জমা দিন",
      contact_form_submit_label: "যোগাযোগ ফর্ম জমা দিন",
      contact_form_success: "আপনার বার্তা সফলভাবে পাঠানো হয়েছে!",
      contact_info_heading: "যোগাযোগের তথ্য",
      contact_info: {
        phone_label: "ফোন",
        email_label: "ইমেইল",
        address_label: "ঠিকানা",
        phone_link_label: "আমাদের ফোন নম্বরে কল করুন",
        email_link_label: "আমাদের একটি ইমেইল পাঠান",
      },
      contact_map_title: "চট্টগ্রাম সিটি কর্পোরেশনের মানচিত্র",

      // Ward Translations
      "Select ward": "ওয়ার্ড নির্বাচন করুন",
      wards: {
        "Ward-1": "দক্ষিণ পাহাড়তলী",
        "Ward-2": "জালালাবাদ",
        "Ward-3": "পাঁচলাইশ",
        "Ward-4": "চান্দগাঁও",
        "Ward-5": "মোহরা",
        "Ward-6": "পূর্ব মাদারবাড়ী",
        "Ward-7": "পশ্চিম মাদারবাড়ী",
        "Ward-8": "শুলকবহর",
        "Ward-9": "উত্তর পাহাড়তলী",
        "Ward-10": "উত্তর কাট্টলী",
        "Ward-11": "দক্ষিণ কাট্টলী",
        "Ward-12": "সরাইপাড়া",
        "Ward-13": "পাহাড়তলী",
        "Ward-14": "লালখান বাজার",
        "Ward-15": "বাগমনিরাম",
        "Ward-16": "চকবাজার",
        "Ward-17": "পশ্চিম বাকলিয়া",
        "Ward-18": "পূর্ব বাকলিয়া",
        "Ward-19": "দক্ষিণ বাকলিয়া",
        "Ward-20": "দেওয়ান বাজার",
        "Ward-21": "জামালখান",
        "Ward-22": "এনায়েত বাজার",
        "Ward-23": "উত্তর পাঠানটুলী",
        "Ward-24": "উত্তর আগ্রাবাদ",
        "Ward-25": "রামপুর",
        "Ward-26": "উত্তর হালিশহর",
        "Ward-27": "দক্ষিণ আগ্রাবাদ",
        "Ward-28": "পাঠানটুলী",
        "Ward-29": "পশ্চিম মাদারবাড়ী",
        "Ward-30": "পূর্ব মাদারবাড়ী",
        "Ward-31": "আলকরণ",
        "Ward-32": "আন্দরকিল্লা",
        "Ward-33": "ফিরিঙ্গী বাজার",
        "Ward-34": "পাথরঘাটা",
        "Ward-35": "বক্সিরহাট",
        "Ward-36": "গোসাইলডাঙ্গা",
        "Ward-37": "উত্তর মধ্য হালিশহর",
        "Ward-38": "দক্ষিণ মধ্য হালিশহর",
        "Ward-39": "দক্ষিণ হালিশহর",
        "Ward-40": "উত্তর পতেঙ্গা",
        "Ward-41": "দক্ষিণ পতেঙ্গা",
      },

      // Additional General Translations
      profile_information: "প্রোফাইল তথ্য",

      no_data: "কোনো ডেটা উপলব্ধ নেই",
      try_again: "অনুগ্রহ করে আবার চেষ্টা করুন",
      back: "পেছনে",
      next: "পরবর্তী",

      edit: "সম্পাদনা করুন",
      delete: "মুছুন",
      confirm: "নিশ্চিত করুন",
      yes: "হ্যাঁ",
      no: "না",
      search: "অনুসন্ধান",
      filter: "ফিল্টার",
      sort: "সাজান",
      clear: "পরিষ্কার",
      download: "ডাউনলোড",
      print: "প্রিন্ট",
      help: "সাহায্য",
      faq: "প্রশ্নোত্তর",
      terms_of_service: "সেবার শর্তাবলী",
      privacy_policy: "গোপনীয়তা নীতি",
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
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
