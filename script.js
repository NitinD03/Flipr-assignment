const projects = [
            { id: 1, name: "Consultation", description: "Lorem ipsum dolor sit amet.", image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357" },
            { id: 2, name: "Design", description: "Lorem ipsum dolor sit amet.", image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357" },
        ];

        const clients = [
            { id: 1, name: "Aarti Verma", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", designation: "Developer", image: "https://randomuser.me/api/portraits/women/1.jpg" },
            { id: 2, name: "Peter Parker", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", designation: "Photographer", image: "https://randomuser.me/api/portraits/men/2.jpg" },
        ];

        const contactSubmissions = [
            { id: 1, fullName: "John Doe", email: "john@example.com", mobile: "1234567890", city: "Indore" },
            { id: 2, fullName: "Jane Smith", email: "jane@example.com", mobile: "0987654321", city: "America" },
        ];

        const subscribedEmails = [
            { id: 1, email: "user1@example.com" },
            { id: 2, email: "user2@example.com" },
        ];

        // Tab Switching
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                document.getElementById(button.dataset.tab).classList.add('active');
            });
        });

        // Populate Tables
        function populateProjects() {
            const tbody = document.querySelector('#project-table tbody');
            tbody.innerHTML = '';
            projects.forEach(project => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><img src="${project.image}" alt="${project.name}"></td>
                    <td>${project.name}</td>
                    <td>${project.description}</td>
                `;
                tbody.appendChild(row);
            });
        }

        function populateClients() {
            const tbody = document.querySelector('#client-table tbody');
            tbody.innerHTML = '';
            clients.forEach(client => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><img src="${client.image}" alt="${client.name}"></td>
                    <td>${client.name}</td>
                    <td>${client.description}</td>
                    <td>${client.designation}</td>
                `;
                tbody.appendChild(row);
            });
        }

        function populateContacts() {
            const tbody = document.querySelector('#contact-table tbody');
            tbody.innerHTML = '';
            contactSubmissions.forEach(contact => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${contact.fullName}</td>
                    <td>${contact.email}</td>
                    <td>${contact.mobile}</td>
                    <td>${contact.city}</td>
                `;
                tbody.appendChild(row);
            });
        }

        function populateEmails() {
            const tbody = document.querySelector('#email-table tbody');
            tbody.innerHTML = '';
            subscribedEmails.forEach(email => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${email.email}</td>`;
                tbody.appendChild(row);
            });
        }

        // Initialize Tables
        populateProjects();
        populateClients();
        populateContacts();
        populateEmails();

        // Image Cropping
        let projectCropper, clientCropper;
        const projectImageInput = document.getElementById('project-image');
        const clientImageInput = document.getElementById('client-image');
        const projectCropperContainer = document.getElementById('project-cropper');
        const clientCropperContainer = document.getElementById('client-cropper');
        const cropProjectButton = document.getElementById('crop-project-image');
        const cropClientButton = document.getElementById('crop-client-image');

        projectImageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const url = URL.createObjectURL(file);
                projectCropperContainer.innerHTML = `<img id="project-preview" src="${url}">`;
                cropProjectButton.style.display = 'block';
                const image = document.getElementById('project-preview');
                projectCropper = new Cropper(image, {
                    aspectRatio: 450 / 350,
                    viewMode: 1,
                });
            }
        });

        clientImageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const url = URL.createObjectURL(file);
                clientCropperContainer.innerHTML = `<img id="client-preview" src="${url}">`;
                cropClientButton.style.display = 'block';
                const image = document.getElementById('client-preview');
                clientCropper = new Cropper(image, {
                    aspectRatio: 450 / 350,
                    viewMode: 1,
                });
            }
        });

        cropProjectButton.addEventListener('click', () => {
            const canvas = projectCropper.getCroppedCanvas();
            document.getElementById('project-image').dataset.cropped = canvas.toDataURL();
            projectCropper.destroy();
            projectCropperContainer.innerHTML = `<img src="${canvas.toDataURL()}" style="width:100px;">`;
            cropProjectButton.style.display = 'none';
        });

        cropClientButton.addEventListener('click', () => {
            const canvas = clientCropper.getCroppedCanvas();
            document.getElementById('client-image').dataset.cropped = canvas.toDataURL();
            clientCropper.destroy();
            clientCropperContainer.innerHTML = `<img src="${canvas.toDataURL()}" style="width:100px;">`;
            cropClientButton.style.display = 'none';
        });

        // Form Submissions
        document.getElementById('project-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('project-name').value;
            const desc = document.getElementById('project-desc').value;
            const image = document.getElementById('project-image').dataset.cropped || "https://images.unsplash.com/photo-1575936123452-b67c3203c357";
            projects.push({ id: projects.length + 1, name, description: desc, image });
            populateProjects();
            e.target.reset();
            projectCropperContainer.innerHTML = '';
            cropProjectButton.style.display = 'none';
            alert('Project added!');
        });

        document.getElementById('client-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('client-name').value;
            const desc = document.getElementById('client-desc').value;
            const designation = document.getElementById('client-designation').value;
            const image = document.getElementById('client-image').dataset.cropped || "https://randomuser.me/api/portraits/women/1.jpg";
            clients.push({ id: clients.length + 1, name, description: desc, designation, image });
            populateClients();
            e.target.reset();
            clientCropperContainer.innerHTML = '';
            cropClientButton.style.display = 'none';
            alert('Client added!');
        });