class ResumeBuilder {
    constructor() {
        this.educationList = [];
        this.experienceList = [];
        this.skills = [];
        this.isFormLocked = false;
        this.currentSection = 'personalInfo';
        this.initializeEventListeners();
        this.loadSavedData();
        this.initializeNavigation();
    }
    initializeEventListeners() {
        var _a, _b, _c, _d, _e;
        (_a = document.getElementById('addEducation')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => this.addEducation());
        (_b = document.getElementById('addExperience')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => this.addExperience());
        (_c = document.getElementById('addSkill')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => this.addSkill());
        (_d = document.getElementById('saveBtn')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => this.saveResume());
        (_e = document.getElementById('printBtn')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', () => this.printResume());
    }
    toggleFormFields(disable) {
        // Disable all input fields
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.disabled = disable;
        });
        // Disable all buttons except Save and Print
        const buttons = document.querySelectorAll('button:not(#saveBtn):not(#printBtn)');
        buttons.forEach(button => {
            button.disabled = disable;
        });
        // Visual feedback
        if (disable) {
            document.body.classList.add('form-locked');
            const saveBtn = document.getElementById('saveBtn');
            saveBtn.innerHTML = '<i class="fas fa-lock"></i> Unlock Form';
            saveBtn.classList.add('unlock-btn');
        }
        else {
            document.body.classList.remove('form-locked');
            const saveBtn = document.getElementById('saveBtn');
            saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Resume';
            saveBtn.classList.remove('unlock-btn');
        }
    }
    addEducation() {
        const educationList = document.getElementById('educationList');
        const educationDiv = document.createElement('div');
        educationDiv.className = 'education-item';
        educationDiv.innerHTML = `
            <input type="text" placeholder="School Name">
            <input type="text" placeholder="Degree">
            <input type="text" placeholder="Year">
            <button onclick="this.parentElement.remove()">Remove</button>
        `;
        educationList === null || educationList === void 0 ? void 0 : educationList.appendChild(educationDiv);
    }
    addExperience() {
        const experienceList = document.getElementById('experienceList');
        const experienceDiv = document.createElement('div');
        experienceDiv.className = 'experience-item';
        experienceDiv.innerHTML = `
            <input type="text" placeholder="Company">
            <input type="text" placeholder="Position">
            <input type="text" placeholder="Duration">
            <textarea placeholder="Description"></textarea>
            <button onclick="this.parentElement.remove()">Remove</button>
        `;
        experienceList === null || experienceList === void 0 ? void 0 : experienceList.appendChild(experienceDiv);
    }
    addSkill() {
        const skillInput = document.getElementById('skillInput');
        const skillsList = document.getElementById('skillsList');
        if (skillInput.value.trim()) {
            const skillDiv = document.createElement('div');
            skillDiv.className = 'skill-item';
            skillDiv.textContent = skillInput.value;
            skillDiv.onclick = () => skillDiv.remove();
            skillsList === null || skillsList === void 0 ? void 0 : skillsList.appendChild(skillDiv);
            this.skills.push(skillInput.value);
            skillInput.value = '';
        }
    }
    saveResume() {
        this.isFormLocked = !this.isFormLocked;
        this.toggleFormFields(this.isFormLocked);
        if (this.isFormLocked) {
            const personalInfo = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value
            };
            localStorage.setItem('resumeData', JSON.stringify({
                personalInfo,
                education: this.educationList,
                experience: this.experienceList,
                skills: this.skills
            }));
            // Show success message
            const toast = document.createElement('div');
            toast.className = 'toast success';
            toast.innerHTML = '<i class="fas fa-check-circle"></i> Resume saved successfully!';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }
    }
    loadSavedData() {
        const savedData = localStorage.getItem('resumeData');
        if (savedData) {
            const data = JSON.parse(savedData);
            // Populate fields with saved data
            Object.entries(data.personalInfo).forEach(([key, value]) => {
                const element = document.getElementById(key);
                if (element)
                    element.value = value;
            });
            // Load other sections...
        }
    }
    printResume() {
        window.print();
    }
    initializeNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                if (section) {
                    this.navigateToSection(section);
                }
            });
        });
        // Monitor scroll for section highlighting
        document.addEventListener('scroll', this.handleScroll.bind(this));
    }
    navigateToSection(sectionId) {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        // Add active class to clicked nav item
        const navItem = document.querySelector(`[data-section="${sectionId}"]`);
        navItem === null || navItem === void 0 ? void 0 : navItem.classList.add('active');
        // Scroll to section
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        this.currentSection = sectionId;
        this.updateProgress();
    }
    handleScroll() {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop - 100 &&
                scrollPosition < sectionTop + sectionHeight - 100) {
                const sectionId = section.id;
                this.highlightNavItem(sectionId);
            }
        });
    }
    highlightNavItem(sectionId) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        const activeNav = document.querySelector(`[data-section="${sectionId}"]`);
        activeNav === null || activeNav === void 0 ? void 0 : activeNav.classList.add('active');
    }
    updateProgress() {
        const sections = ['personalInfo', 'education', 'experience', 'skills'];
        const currentIndex = sections.indexOf(this.currentSection);
        const progress = ((currentIndex + 1) / sections.length) * 100;
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }
}
// Initialize the resume builder
new ResumeBuilder();
// Add these styles to your CSS
const styles = `
.form-locked input:disabled,
.form-locked textarea:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
    opacity: 0.7;
}

.unlock-btn {
    background-color: #dc2626 !important;
}

.toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 24px;
    border-radius: 8px;
    color: white;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
}

.toast.success {
    background-color: #22c55e;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;
