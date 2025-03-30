// Sprint A3 Part 1: Ensure DOM is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('🚀 Portfolio Project Loaded');

// ✅ Sprint B2: Contact Form Security Implementation

// --- Part 1: Sanitize Input ---
function sanitizeInput(input) {
    const tagRemoved = input.replace(/<\/?[^>]+(>|$)/g, ""); // remove HTML tags
    return tagRemoved
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function generateCSRFToken() {
    const token = crypto.randomUUID();
    sessionStorage.setItem("csrfToken", token);
  
    const tokenInput = document.createElement("input");
    tokenInput.type = "hidden";
    tokenInput.name = "csrfToken";
    tokenInput.value = token;
  
    const form = document.querySelector("form");
    if (form) {
      form.appendChild(tokenInput);
    }
  }
  generateCSRFToken();

  // ✅ Sprint B2: Project Class with OOP & Closures

// ✅ Sprint B2: Project Class with Validation & Secure OOP

class Project {
    #viewCount = 0; // private field
  
    constructor(id, title, description, techStack = [], category = "Uncategorized", image = "default-placeholder.jpg") {
        if (!id || !title || !description || !Array.isArray(techStack)) {
          throw new Error("Invalid project data: All fields must be provided and techStack must be an array.");
        }
      
        this.id = id;
        this.title = title;
        this.description = description;
        this.techStack = techStack;
        this.category = category;
        this.image = image || "images/default-placeholder.jpg";
    }

      incrementViews() {
        this.#viewCount++;
      }
      
      getViews() {
        return this.#viewCount;
      }      
  
    usesTechnology(tech) {
      if (!tech || typeof tech !== "string") {
        console.warn("⚠️ Invalid technology input.");
        return false;
      }
      return this.techStack.includes(tech);
    }
  
    static createViewTracker() {
      let views = 0;
      return {
        increment: () => ++views,
        getViews: () => views
      };
    }
  }  

// Part 2: Variable Declarations and Data Types
const userName = "Ywj Siab Vaj"; // String
let userAge = 22; // Number
const isStudent = true; // Boolean

console.log("Data Types:");
console.log(typeof userName); // Expected output: string
console.log(typeof userAge); // Expected output: number
console.log(typeof isStudent); // Expected output: boolean

// Part 3: Operators
const num1 = 15;
const num2 = 5;

// Arithmetic Operations
const sum = num1 + num2;
const difference = num1 - num2;
const product = num1 * num2;
const quotient = num1 / num2;

// Logical Operation Example
const isAdult = userAge >= 18 && !isStudent;

// Conditional (ternary) operator
const category = userAge >= 18 ? "Adult" : "Minor";

console.log("Arithmetic Operations:");
console.log("Sum:", sum);
console.log("Difference:", difference);
console.log("Product:", product);
console.log("Quotient:", quotient);

console.log("Logical & Conditional Operations:");
console.log("Is Adult:", isAdult);
console.log("Category:", category);

// Part 4: Type Conversion

// Implicit type conversion
const implicitConversion = "The result is " + num1;
console.log("Implicit Conversion:", implicitConversion);

// Explicit type conversion
const explicitNumber = Number("42");
const explicitString = String(userAge);
const explicitBoolean = Boolean(1);

console.log("Explicit Conversions:");
console.log("Number:", explicitNumber);
console.log("String:", explicitString);
console.log("Boolean:", explicitBoolean);

// Sprint A2

// Part 2: Integrate Arrays and Objects
const projects = [
    new Project(
      1,
      "Tri and Succeed Sports",
      "Worked on website layout and text styling. Adjusted fonts, images, and positioning.",
      ["HTML", "CSS"],
      "Web Development",
      "tss_logo.png"
    ),
    new Project(
      2,
      "Trusted Friends DayCare",
      "Styled the website for different screen sizes (responsive design).",
      ["HTML", "CSS", "Responsive Design"],
      "Responsive Design",
      "tf_logo.png"
    ),
    new Project(
      3,
      "Slate & Pencil Tutoring",
      "Utilized grid layouts for better positioning and website organization.",
      ["HTML", "CSS", "Grid Layout"],
      "UI/UX Design",
      "slate-and-pencil_logo.png"
    )
  ];
  
  
  // Log projects array to console
  console.log("Projects:");
  projects.forEach((project) => {
    console.log(`ID: ${project.id}`);
    console.log(`Title: ${project.title}`);
    console.log(`Category: ${project.category}`);
    console.log(`Description: ${project.description}`);
    console.log(`Technologies Used: ${project.techStack.join(", ")}`);
    console.log(`Image: ${project.image}`);
    console.log("--------------------");
  });
  
  
  // Part 3: Testing and Validation
  console.log("JavaScript functionality is running as expected. Check the console for output.");

// Sprint A3 Part 2: Dynamic Project Display
function displayProjects(projectArray) {
    const container = document.getElementById("projectList");
  
    if (!container) {
      console.warn("Project container not found.");
      return;
    }
  
    function escapeHTML(str) {
        return str
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      }
        
    projectArray.forEach((project) => {
      try {
        if (!(project instanceof Project)) {
          throw new Error("Invalid project object.");
        }
  
        const card = document.createElement("div");
        card.classList.add("project-card");
  
        const title = document.createElement("h3");
        title.textContent = project.title;

        const image = document.createElement("img");
        image.src = project.image;
        image.alt = `${project.title} image`;
        image.className = "project-image";

  
        const description = document.createElement("p");
        description.textContent = project.description;
  
        const tech = document.createElement("p");
        tech.innerHTML = `<strong>Technologies:</strong> ${project.techStack.map(t => escapeHTML(t)).join(", ")}`;
  
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(tech);
        container.appendChild(card);
      } catch (error) {
        console.error("Error displaying project:", error.message);
      }
    });
  }

// Part 3: Interactive Features - Filtering Projects
//Sprint B1 Part 3: Safe DOM Manipulation
window.filterProjects = (category) => {
    try {
        console.log(`Filtering projects by category: ${category}`);
        if (!projects || !Array.isArray(projects)) {
            throw new Error("Projects data is not properly loaded");
        }

        const filteredProjects = projects.filter(project => project.category === category || category === 'All');
        displayFilteredProjects(filteredProjects);
    } catch (error) {
        console.error('Error filtering projects:', error);
    }
};


// ✅ Function to load project details dynamically
// This function retrieves and displays the details of a selected project
window.loadProjectDetails = (projectId) => {
  try {
      console.log(`Attempting to load details for project ID: ${projectId}`);

      const project = projects.find(p => p.id === projectId);
      if (!project) {
          console.error(`Error: Project with ID ${projectId} not found`);
          const detailsContainer = document.getElementById('projectDetails');
          if (detailsContainer) {
            detailsContainer.textContent = 'Project not found. Please select a valid project.';
            detailsContainer.classList.add('error-message');
          }
          return;
        }

        // ✅ Track and log project views
        if (typeof project.incrementViews === "function") {
            project.incrementViews();
            console.log(`👁️ Views for "${project.title}": ${project.getViews()}`);
        }
  


        const detailsContainer = document.getElementById('projectDetails');
        if (!detailsContainer) {
          console.error('Error: Project details container not found');
          return;
        }

        console.log(`Found project: ${project.title}`);

        // Clear previous project details before updating
        while (detailsContainer.firstChild) {
          detailsContainer.removeChild(detailsContainer.firstChild);
        }

        // Dynamically create and append elements for better security and structure
        const titleElement = document.createElement('h2');
        titleElement.innerText = project.title;
        detailsContainer.appendChild(titleElement);

      const categoryElement = document.createElement('p');
      categoryElement.innerText = `Category: ${project.category}`;
      detailsContainer.appendChild(categoryElement);

      const imageElement = document.createElement('img');
      imageElement.src = project.image;
      imageElement.alt = project.title;
      imageElement.className = 'project-detail-image';
      detailsContainer.appendChild(imageElement);

      const descriptionElement = document.createElement('p');
      descriptionElement.innerText = project.description;
      detailsContainer.appendChild(descriptionElement);

      const techElement = document.createElement('p');
      techElement.innerText = `Technologies Used: ${project.techStack.join(', ')}`;
      detailsContainer.appendChild(techElement);

      console.log(`Project details updated for: ${project.title}`);
    } catch (error) {
      console.error('Error loading project details:', error);
      const detailsContainer = document.getElementById('projectDetails');
      if (detailsContainer) {
          detailsContainer.innerText = 'An error occurred while loading project details. Please try again.';
          detailsContainer.classList.add('error-message');
        }
    }
};

// ✅ Function to display filtered projects dynamically
const displayFilteredProjects = (filteredProjects) => {
  try {
      const projectContainer = document.getElementById('projectContainer');
      if (!projectContainer) {
          console.error('Error: Project container not found');
          throw new Error('Project container not found');
      }

      projectContainer.textContent = '';
      filteredProjects.forEach(project => {
          const projectCard = document.createElement('div');
          projectCard.className = 'project-card';

          const titleElement = document.createElement('h3');
          titleElement.textContent = project.title;
          projectCard.appendChild(titleElement);

          const categoryElement = document.createElement('p');
          categoryElement.textContent = `Category: ${project.category}`;
          projectCard.appendChild(categoryElement);

          const imageElement = document.createElement('img');
          imageElement.src = project.image;
          imageElement.alt = project.title;
          imageElement.className = 'project-image';
          projectCard.appendChild(imageElement);

          const descriptionElement = document.createElement('p');
          descriptionElement.textContent = project.description;
          projectCard.appendChild(descriptionElement);

          const techElement = document.createElement('p');
          techElement.textContent = `Technologies: ${project.techStack.join(', ')}`;
          projectCard.appendChild(techElement);

          const detailsButton = document.createElement('button');
          detailsButton.textContent = 'View Details';
          detailsButton.addEventListener('click', () => window.loadProjectDetails(project.id));
          projectCard.appendChild(detailsButton);

          projectContainer.appendChild(projectCard);
        });
    } catch (error) {
      console.error('Error displaying filtered projects:', error);
    }
};

// Part 5: Contact Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        try {
            event.preventDefault();
            const name = sanitizeInput(document.getElementById("name").value);
            const email = sanitizeInput(document.getElementById("email").value);
            const message = sanitizeInput(document.getElementById("message").value);
            const formError = document.getElementById('formError');
            const formSuccess = document.getElementById('formSuccess');

            const submittedToken = document.querySelector("input[name='csrfToken']")?.value;
            const storedToken = sessionStorage.getItem("csrfToken");
            

            if (!name || !email || !message) {
                document.getElementById("formError").innerText = "Please fill out all fields.";
                return;
            }

            if (!submittedToken || submittedToken !== storedToken) {
                alert("CSRF token mismatch. Submission blocked.");
                return;
            }
            
            // Sprint A4 part 2
            // Function to show error and clear success message
            const showError = (errorMsg) => {
                if (formError) {formError.innerText = errorMsg;}
                if (formSuccess) {formSuccess.innerText = '';} // Clear success message
            };

            // Validate name making sure it only takes letters and spaces.
            const nameRegex = /^[A-Za-z\s]+$/;
            if (!name || !nameRegex.test(name)) {
                console.error('Error: Name must contain only letters and spaces.');
                showError('Name can only contain letters and spaces.'); // Sprint B1 part 3: Form Validation with error messaging
                return;
            }

            // Validate email only allowing names, numbers, period and the @ sign.
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                console.error('Error: Invalid email format');
                showError('Please enter a valid email address.'); // Sprint B1 part 3: Form Validation with error messaging
                return;
            }

            // Validate message making sure it is longer than 10 characters long.
            if (!message || message.length < 10) {
                console.error('Error: Message must be at least 10 characters.'); 
                showError('Message must be at least 10 characters long.'); // Sprint B1 part 3: Form Validation with error messaging
                return;
            }

            // Clear error message if all validations pass
            if (formError) {formError.innerText = '';}
            
            // ⏱️ Rate Limiting: Block repeated submissions within 30 seconds
            const lastSubmit = sessionStorage.getItem('lastContactSubmit');
            const now = Date.now();
            if (lastSubmit && now - lastSubmit < 30000) {
                console.warn('You must wait before submitting again.');
                document.getElementById('formError').innerText = 'Please wait before submitting again.';
                return;
            }

            sessionStorage.setItem('lastContactSubmit', now.toString());

            console.log('Form submitted successfully:', { name, email, message });

            if (formSuccess){formSuccess.innerText = 'Your message has been sent!';}
            contactForm.reset();
        } catch (error) {
            console.error('Error handling contact form submission:', error);
        }
    });
} else {
    console.warn("No 'contactForm' found on this page. Skipping form event listener.");
}

// Sprint B1 Part 2: Create user friendly error and success messages
function showError(msg, errorElement, successElement) {
    if (errorElement) {
        errorElement.innerText = msg;
        errorElement.style.display = 'block';
    }
    if (successElement) {
        successElement.style.display = 'none';
    }
    console.error(`Error: ${msg}`);
}

function clearError(errorElement) {
    if (errorElement) {
        errorElement.innerText = '';
        errorElement.style.display = 'none';
    }
}

function showSuccess(msg, successElement) {
    if (successElement) {
        successElement.innerText = msg;
        successElement.style.display = 'block';
        console.log(`Success: ${msg}`);

        // Hide success message after 3 seconds
        setTimeout(() => {
            successElement.style.display = 'none';
        }, 3000);
    }
}

// Sprint A4 Part 3
/**
 * Utility function to create a label element.
 * @param {string} forId - The ID of the input the label is for.
 * @param {string} text - The text for the label.
 * @returns {HTMLElement} - The created label element.
 */
function createLabel(forId, text) {
    const label = document.createElement('label');
    label.setAttribute('for', forId);
    label.textContent = text;
    return label;
}

/**
 * Utility function to create an input field.
 * @param {string} type - The input type (e.g., text, email, file).
 * @param {string} id - The ID of the input.
 * @param {boolean} required - Whether the field is required.
 * @param {string} placeholder - Placeholder text (optional).
 * @param {string} accept - Accepted file types (optional for file input).
 * @returns {HTMLElement} - The created input element.
 */
function createInput(type, id, required = false, placeholder = '', accept = '') {
    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    if (required) {input.required = true;}
    if (placeholder) {input.placeholder = placeholder;}
    if (accept) {input.accept = accept;}
    return input;
}

/**
 * Utility function to create an input field group with a label.
 * @param {string} id - The ID of the input field.
 * @param {string} labelText - The text for the label.
 * @param {string} type - The input type (default: text).
 * @param {string} placeholder - The placeholder text (optional).
 * @returns {HTMLElement} - A div container holding the label and input.
 */
function createInputGroup(id, labelText, type = 'text', placeholder = '') {
    const wrapper = document.createElement('div');
    wrapper.className = 'input-group';
    wrapper.appendChild(createLabel(id, labelText));
    wrapper.appendChild(createInput(type, id, true, placeholder));
    return wrapper;
}

const handleFormSubmission = (event) => {
    try {
        event.preventDefault();

        const formError = document.getElementById('formError');
        const formSuccess = document.getElementById('formSuccess');

        const title = document.getElementById('title')?.value.trim();
        const category = document.getElementById('category')?.value;
        let description = document.getElementById('description')?.value.trim();
        let technologies = document.getElementById('technologies')?.value.trim();
        const projectLink = document.getElementById('projectLink')?.value.trim();
        const projectImage = document.getElementById('projectImage')?.files[0];

        technologies = technologies ? technologies.split(',').map(tech => tech.trim()) : [];

        if (!title || !description || !technologies.length || !projectLink) {
            showError("All fields are required!", formError, formSuccess);
            return;
        }
        
        // ✅ Add these debugging logs before creating the project object
        console.log("Attempting to add new project...");
        console.log("Title:", title);
        console.log("Category:", category);
        console.log("Description:", description);
        console.log("Technologies Used:", technologies);
        console.log("Project Link:", projectLink);
        console.log("Image File:", projectImage ? projectImage.name : "No Image Uploaded");

        // Validate description to make sure its longer than 10 characters.
        if (!description || description.length < 10) {
            showError("Project description must be at least 10 characters long!", formError, formSuccess);
            return;
        }

        // Validate URL format
        const urlRegex = /^(https?:\/\/)?([\w\d\-_]+\.+[A-Za-z]{2,})+\/?/;
        if (!urlRegex.test(projectLink)) {
            showError("Enter a valid project URL!", formError, formSuccess);
            return;
        }

        // Validate image file
        let imageURL = "";
        if (projectImage) {
            const validImageTypes = ["image/png", "image/jpeg"];
            if (!validImageTypes.includes(projectImage.type)) {
                showError("Only PNG and JPEG images are allowed!", formError, formSuccess);
                return;
            }
            imageURL = URL.createObjectURL(projectImage);
        }

        // Clear previous error
        clearError(formError);

        const newProject = new Project(
            projects.length + 1,
            title,
            description,
            technologies,
            category,
            imageURL
        );


        // Store and display project
        projects.push(newProject);
        displayProjects();

        // Show success message and reset form
        showSuccess("Project added successfully!", formSuccess);
        document.getElementById('projectForm').reset();

        console.log("Project successfully added:", newProject); // Log project details in console
    } catch (error) {
        console.error("Error handling project submission:", error);
    }
};

// Sprint A4 Part 3
const addProjectForm = () => {
    try {
        const formContainer = document.getElementById('projectSubmission');
        if (!formContainer) {
            console.error('Error: Project submission container not found');
            return;
        }

        // Remove existing form if already present to avoid duplication
        if (document.getElementById('projectForm')) {
            console.warn("Project form already exists. Skipping form creation.");
            return;
        }

        // Create Form Element
        const form = document.createElement('form');
        form.id = 'projectForm';

        // Project Title
        form.appendChild(createLabel('title', 'Project Title:'));
        form.appendChild(createInput('text', 'title', true));

        // Project Description
        form.appendChild(createLabel('description', 'Project Description:'));
        const descriptionInput = document.createElement('textarea');
        descriptionInput.id = 'description';
        descriptionInput.required = true;
        form.appendChild(descriptionInput);

        // Technologies & Project Link (Side by Side)
        const flexContainer = document.createElement('div');
        flexContainer.className = 'form-flex-container';

        // Category Selection
        const categoryWrapper = document.createElement('div');
        categoryWrapper.className = 'input-group';
        categoryWrapper.appendChild(createLabel('category', 'Project Category:'));

        const categorySelect = document.createElement('select');
        categorySelect.id = 'category';
        categorySelect.required = true;

        // Category Options
        const categories = ["Web Development", "UI/UX Design", "Responsive Design"];
        categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
        });

        categoryWrapper.appendChild(categorySelect);
        flexContainer.appendChild(categoryWrapper);


        // Technologies Used
        const techWrapper = createInputGroup('technologies', 'Technologies Used (comma-separated):');
        flexContainer.appendChild(techWrapper);

        // Project Link
        const linkWrapper = createInputGroup('projectLink', 'Project Link:', 'url', 'https://example.com');
        flexContainer.appendChild(linkWrapper);

        form.appendChild(flexContainer);

        // File Upload Section
        const fileContainer = document.createElement('div');
        fileContainer.className = 'file-upload-container';
        fileContainer.appendChild(createLabel('projectImage', 'Upload Image:'));
        fileContainer.appendChild(createInput('file', 'projectImage', false, '', 'image/png, image/jpeg'));
        form.appendChild(fileContainer);

        // Submit Button
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Add Project';
        form.appendChild(submitButton);

        // Append form to the container
        formContainer.appendChild(form);

        // Add event listener for form submission
        form.addEventListener('submit', handleFormSubmission);

    } catch (error) {
        console.error('Error creating project submission form:', error);
    }
};
// Call the function to render the form
addProjectForm();
displayFilteredProjects(projects);
} catch (error) {
    console.error('Error during page initialization:', error);
}
});