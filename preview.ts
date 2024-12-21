class ResumePreview {
    constructor() {
        this.loadResumeData();
    }

    private loadResumeData(): void {
        const savedData = localStorage.getItem('resumeData');
        if (!savedData) return;

        const data = JSON.parse(savedData);
        this.populatePersonalInfo(data.personalInfo);
        this.populateEducation(data.education);
        this.populateExperience(data.experience);
        this.populateSkills(data.skills);
    }

    private populatePersonalInfo(personalInfo: any): void {
        document.getElementById('previewName')!.textContent = personalInfo.fullName;
        document.getElementById('previewEmail')!.textContent = personalInfo.email;
        document.getElementById('previewPhone')!.textContent = personalInfo.phone;
        document.getElementById('previewAddress')!.textContent = personalInfo.address;
    }

    private populateEducation(education: any[]): void {
        const educationList = document.getElementById('previewEducation')!;
        education.forEach(edu => {
            const eduItem = document.createElement('div');
            eduItem.className = 'education-item';
            eduItem.innerHTML = `
                <h3>${edu.school}</h3>
                <div class="education-details">
                    <strong>${edu.degree}</strong>
                    <span>${edu.year}</span>
                </div>
            `;
            educationList.appendChild(eduItem);
        });
    }

    private populateExperience(experience: any[]): void {
        const experienceList = document.getElementById('previewExperience')!;
        experience.forEach(exp => {
            const expItem = document.createElement('div');
            expItem.className = 'experience-item';
            expItem.innerHTML = `
                <h3>${exp.company}</h3>
                <div class="experience-details">
                    <strong>${exp.position}</strong>
                    <span>${exp.duration}</span>
                </div>
                <p>${exp.description}</p>
            `;
            experienceList.appendChild(expItem);
        });
    }

    private populateSkills(skills: string[]): void {
        const skillsList = document.getElementById('previewSkills')!;
        skills.forEach(skill => {
            const skillItem = document.createElement('span');
            skillItem.className = 'skill-item';
            skillItem.textContent = skill;
            skillsList.appendChild(skillItem);
        });
    }
}

// Initialize preview
new ResumePreview();
