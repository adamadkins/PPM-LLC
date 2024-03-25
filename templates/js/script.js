document.addEventListener("DOMContentLoaded", function () {
    console.log("Document is ready!");
});


document.addEventListener('DOMContentLoaded', function() {
    const propertyTypeSelect = document.getElementById('propertyType');
    const serviceTypeSelect = document.getElementById('serviceType');

    propertyTypeSelect.addEventListener('change', function() {
        const propertyType = this.value;
        console.log(`Property Type Selected: ${propertyType}`); // Debug log

        serviceTypeSelect.innerHTML = ''; // Clear current options

        // Default option
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Select Service Type';
        defaultOption.value = '';
        serviceTypeSelect.appendChild(defaultOption);

        // Define services based on property type
        let services = [];
        if (propertyType === 'residential') {
            services = ['Lawn Care', 'House Cleaning', 'Plumbing Repair'];
        } else if (propertyType === 'commercial') {
            services = ['Office Cleaning', 'Building Maintenance', 'Landscaping'];
        }

        // Populate the service type dropdown
        services.forEach(function(service) {
            const option = document.createElement('option');
            option.value = service.toLowerCase().replace(/\s+/g, '_');
            option.textContent = service;
            serviceTypeSelect.appendChild(option);
        });

        console.log(`Services Updated: ${services.join(', ')}`); // Debug log
    });
});



function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);


window.addEventListener("load", reveal);


var tabs = document.querySelectorAll('#navbar > div > a');

tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
        // Remove the 'active' class from all tabs
        tabs.forEach(function (t) {
            t.classList.remove('clicked');
        });

        // Add the 'active' class to the clicked tab
        tab.classList.add('clicked');

    });
});



document.addEventListener('DOMContentLoaded', function() {
    var menuLinks = document.querySelectorAll('#menu a');
    var menuCheckbox = document.getElementById('menuCheckbox');

    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            console.log('Menu link clicked. Checkbox will be unchecked now.');
            menuCheckbox.checked = false;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('fullscreen');

        // Toggle a class on the body element to disable/enable scrolling
        document.body.classList.toggle('menu-open');
    });
});


document.getElementById('fileupload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const previewContainer = document.getElementById('filePreview');
    const removeButton = document.getElementById('removeFile');

    if (file) {
        // Preview for images
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewContainer.innerHTML = `<img src="${e.target.result}" style="max-width: 200px; max-height: 200px;">`; // Adjust styling as needed
                removeButton.style.display = 'inline'; // Show remove button
            };
            reader.readAsDataURL(file);
        } else {
            // For non-image files, adjust as necessary. Here we're just displaying the file name.
            previewContainer.textContent = `Selected file: ${file.name}`;
            removeButton.style.display = 'inline'; // Show remove button
        }
    }
});
