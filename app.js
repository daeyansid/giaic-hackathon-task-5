var ResumeBuilder = /** @class */ (function () {
    function ResumeBuilder() {
        this.educationList = [];
        this.experienceList = [];
        this.skills = [];
        this.isFormLocked = false;
        this.currentSection = 'personalInfo';
        this.initializeEventListeners();
        this.loadSavedData();
        this.initializeNavigation();
    }
    ResumeBuilder.prototype.initializeEventListeners = function () {
        var _this = this;
        var _a, _b, _c, _d, _e;
        (_a = document.getElementById('addEducation')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return _this.addEducation(); });
        (_b = document.getElementById('addExperience')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return _this.addExperience(); });
        (_c = document.getElementById('addSkill')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return _this.addSkill(); });
        (_d = document.getElementById('saveBtn')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () { return _this.saveResume(); });
        (_e = document.getElementById('printBtn')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () { return _this.printResume(); });
    };
    ResumeBuilder.prototype.toggleFormFields = function (disable) {
        // Disable all input fields
        var inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(function (input) {
            input.disabled = disable;
        });
        // Disable all buttons except Save and Print
        var buttons = document.querySelectorAll('button:not(#saveBtn):not(#printBtn)');
        buttons.forEach(function (button) {
            button.disabled = disable;
        });
        // Visual feedback
        if (disable) {
            document.body.classList.add('form-locked');
            var saveBtn = document.getElementById('saveBtn');
            saveBtn.innerHTML = '<i class="fas fa-lock"></i> Unlock Form';
            saveBtn.classList.add('unlock-btn');
        }
        else {
            document.body.classList.remove('form-locked');
            var saveBtn = document.getElementById('saveBtn');
            saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Resume';
            saveBtn.classList.remove('unlock-btn');
        }
    };
    ResumeBuilder.prototype.addEducation = function () {
        var educationList = document.getElementById('educationList');
        var educationDiv = document.createElement('div');
        educationDiv.className = 'education-item';
        educationDiv.innerHTML = "\n            <input type=\"text\" placeholder=\"School Name\" class=\"school\">\n            <input type=\"text\" placeholder=\"Degree\" class=\"degree\">\n            <input type=\"text\" placeholder=\"Year\" class=\"year\">\n            <button onclick=\"this.parentElement.remove()\">Remove</button>\n        ";
        educationList === null || educationList === void 0 ? void 0 : educationList.appendChild(educationDiv);
    };
    ResumeBuilder.prototype.addExperience = function () {
        var experienceList = document.getElementById('experienceList');
        var experienceDiv = document.createElement('div');
        experienceDiv.className = 'experience-item';
        experienceDiv.innerHTML = "\n            <input type=\"text\" placeholder=\"Company\" class=\"company\">\n            <input type=\"text\" placeholder=\"Position\" class=\"position\">\n            <input type=\"text\" placeholder=\"Duration\" class=\"duration\">\n            <textarea placeholder=\"Description\" class=\"description\"></textarea>\n            <button onclick=\"this.parentElement.remove()\">Remove</button>\n        ";
        experienceList === null || experienceList === void 0 ? void 0 : experienceList.appendChild(experienceDiv);
    };
    ResumeBuilder.prototype.addSkill = function () {
        var skillInput = document.getElementById('skillInput');
        var skillsList = document.getElementById('skillsList');
        if (skillInput.value.trim()) {
            var skillDiv_1 = document.createElement('div');
            skillDiv_1.className = 'skill-item';
            skillDiv_1.textContent = skillInput.value;
            skillDiv_1.onclick = function () { return skillDiv_1.remove(); };
            skillsList === null || skillsList === void 0 ? void 0 : skillsList.appendChild(skillDiv_1);
            this.skills.push(skillInput.value);
            skillInput.value = '';
        }
    };
    ResumeBuilder.prototype.saveResume = function () {
        this.isFormLocked = !this.isFormLocked;
        this.toggleFormFields(this.isFormLocked);
        if (this.isFormLocked) {
            // Collect Personal Info
            var personalInfo = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value
            };
            // Collect Education Data
            this.educationList = Array.from(document.querySelectorAll('.education-item')).map(function (item) { return ({
                school: item.querySelector('.school').value,
                degree: item.querySelector('.degree').value,
                year: item.querySelector('.year').value
            }); });
            // Collect Experience Data
            this.experienceList = Array.from(document.querySelectorAll('.experience-item')).map(function (item) { return ({
                company: item.querySelector('.company').value,
                position: item.querySelector('.position').value,
                duration: item.querySelector('.duration').value,
                description: item.querySelector('.description').value
            }); });
            // Save all data to localStorage
            var resumeData = {
                personalInfo: personalInfo,
                education: this.educationList,
                experience: this.experienceList,
                skills: this.skills
            };
            localStorage.setItem('resumeData', JSON.stringify(resumeData));
            // Generate URL-friendly name
            var formattedName = personalInfo.fullName.toLowerCase().replace(/[^a-z0-9]/g, '-');
            var previewUrl = "preview.html?name=".concat(formattedName);
            // Open the preview page in a new tab
            window.open(previewUrl, '_blank');
            // Show success message
            var toast_1 = document.createElement('div');
            toast_1.className = 'toast success';
            toast_1.innerHTML = '<i class="fas fa-check-circle"></i> Resume saved successfully!';
            document.body.appendChild(toast_1);
            setTimeout(function () { return toast_1.remove(); }, 3000);
        }
    };
    ResumeBuilder.prototype.loadSavedData = function () {
        var _this = this;
        var savedData = localStorage.getItem('resumeData');
        if (savedData) {
            var data = JSON.parse(savedData);
            // Populate Personal Info
            Object.entries(data.personalInfo).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                var element = document.getElementById(key);
                if (element)
                    element.value = value;
            });
            // Populate Education
            data.education.forEach(function (edu) {
                _this.addEducation();
                var educationItem = document.querySelectorAll('.education-item');
                var lastItem = educationItem[educationItem.length - 1];
                lastItem.querySelector('.school').value = edu.school;
                lastItem.querySelector('.degree').value = edu.degree;
                lastItem.querySelector('.year').value = edu.year;
            });
            // Populate Experience
            data.experience.forEach(function (exp) {
                _this.addExperience();
                var experienceItem = document.querySelectorAll('.experience-item');
                var lastItem = experienceItem[experienceItem.length - 1];
                lastItem.querySelector('.company').value = exp.company;
                lastItem.querySelector('.position').value = exp.position;
                lastItem.querySelector('.duration').value = exp.duration;
                lastItem.querySelector('.description').value = exp.description;
            });
            // Populate Skills
            this.skills = data.skills || [];
            var skillsList_1 = document.getElementById('skillsList');
            this.skills.forEach(function (skill) {
                var skillDiv = document.createElement('div');
                skillDiv.className = 'skill-item';
                skillDiv.textContent = skill;
                skillDiv.onclick = function () { return skillDiv.remove(); };
                skillsList_1 === null || skillsList_1 === void 0 ? void 0 : skillsList_1.appendChild(skillDiv);
            });
        }
    };
    ResumeBuilder.prototype.printResume = function () {
        window.print();
    };
    ResumeBuilder.prototype.initializeNavigation = function () {
        var _this = this;
        var navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(function (item) {
            item.addEventListener('click', function (e) {
                var section = e.currentTarget.dataset.section;
                if (section) {
                    _this.navigateToSection(section);
                }
            });
        });
        // Monitor scroll for section highlighting
        document.addEventListener('scroll', this.handleScroll.bind(this));
    };
    ResumeBuilder.prototype.navigateToSection = function (sectionId) {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(function (item) {
            item.classList.remove('active');
        });
        // Add active class to clicked nav item
        var navItem = document.querySelector("[data-section=\"".concat(sectionId, "\"]"));
        navItem === null || navItem === void 0 ? void 0 : navItem.classList.add('active');
        // Scroll to section
        var section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        this.currentSection = sectionId;
        this.updateProgress();
    };
    ResumeBuilder.prototype.handleScroll = function () {
        var _this = this;
        var sections = document.querySelectorAll('.section');
        var scrollPosition = window.scrollY;
        sections.forEach(function (section) {
            var sectionTop = section.offsetTop;
            var sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop - 100 &&
                scrollPosition < sectionTop + sectionHeight - 100) {
                var sectionId = section.id;
                _this.highlightNavItem(sectionId);
            }
        });
    };
    ResumeBuilder.prototype.highlightNavItem = function (sectionId) {
        document.querySelectorAll('.nav-item').forEach(function (item) {
            item.classList.remove('active');
        });
        var activeNav = document.querySelector("[data-section=\"".concat(sectionId, "\"]"));
        activeNav === null || activeNav === void 0 ? void 0 : activeNav.classList.add('active');
    };
    ResumeBuilder.prototype.updateProgress = function () {
        var sections = ['personalInfo', 'education', 'experience', 'skills'];
        var currentIndex = sections.indexOf(this.currentSection);
        var progress = ((currentIndex + 1) / sections.length) * 100;
        var progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = "".concat(progress, "%");
        }
    };
    return ResumeBuilder;
}());
// Initialize the resume builder
new ResumeBuilder();
// Add these styles to your CSS
var styles = "\n.form-locked input:disabled,\n.form-locked textarea:disabled {\n    background-color: #f3f4f6;\n    cursor: not-allowed;\n    opacity: 0.7;\n}\n\n.unlock-btn {\n    background-color: #dc2626 !important;\n}\n\n.toast {\n    position: fixed;\n    bottom: 20px;\n    right: 20px;\n    padding: 12px 24px;\n    border-radius: 8px;\n    color: white;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;\n}\n\n.toast.success {\n    background-color: #22c55e;\n}\n\n@keyframes slideIn {\n    from {\n        transform: translateX(100%);\n        opacity: 0;\n    }\n    to {\n        transform: translateX(0);\n        opacity: 1;\n    }\n}\n\n@keyframes slideOut {\n    from {\n        transform: translateX(0);\n        opacity: 1;\n    }\n    to {\n        transform: translateX(100%);\n        opacity: 0;\n    }\n}\n";
