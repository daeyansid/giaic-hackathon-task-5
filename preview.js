var ResumePreview = /** @class */ (function () {
    function ResumePreview() {
        this.loadResumeData();
    }
    ResumePreview.prototype.loadResumeData = function () {
        var savedData = localStorage.getItem('resumeData');
        if (!savedData)
            return;
        var data = JSON.parse(savedData);
        var urlParams = new URLSearchParams(window.location.search);
        var nameParam = urlParams.get('name');
        if (nameParam && data.personalInfo.fullName.toLowerCase().replace(/[^a-z0-9]/g, '-') === nameParam) {
            this.populatePersonalInfo(data.personalInfo);
            this.populateEducation(data.education);
            this.populateExperience(data.experience);
            this.populateSkills(data.skills);
        }
        else {
            alert("No matching resume found!");
        }
    };
    ResumePreview.prototype.populatePersonalInfo = function (personalInfo) {
        document.getElementById('previewName').textContent = personalInfo.fullName;
        document.getElementById('previewEmail').textContent = personalInfo.email;
        document.getElementById('previewPhone').textContent = personalInfo.phone;
        document.getElementById('previewAddress').textContent = personalInfo.address;
    };
    ResumePreview.prototype.populateEducation = function (education) {
        var educationList = document.getElementById('previewEducation');
        education.forEach(function (edu) {
            var eduItem = document.createElement('div');
            eduItem.className = 'education-item';
            eduItem.innerHTML = "\n                <h3>".concat(edu.school, "</h3>\n                <p>").concat(edu.degree, "</p>\n                <p>").concat(edu.year, "</p>\n            ");
            educationList.appendChild(eduItem);
        });
    };
    ResumePreview.prototype.populateExperience = function (experience) {
        var experienceList = document.getElementById('previewExperience');
        experience.forEach(function (exp) {
            var expItem = document.createElement('div');
            expItem.className = 'experience-item';
            expItem.innerHTML = "\n                <h3>".concat(exp.company, "</h3>\n                <p><strong>").concat(exp.position, "</strong> | ").concat(exp.duration, "</p>\n                <p>").concat(exp.description, "</p>\n            ");
            experienceList.appendChild(expItem);
        });
    };
    ResumePreview.prototype.populateSkills = function (skills) {
        var skillsList = document.getElementById('previewSkills');
        skills.forEach(function (skill) {
            var skillItem = document.createElement('span');
            skillItem.className = 'skill-item';
            skillItem.textContent = skill;
            skillsList.appendChild(skillItem);
        });
    };
    return ResumePreview;
}());
// Initialize preview
new ResumePreview();
