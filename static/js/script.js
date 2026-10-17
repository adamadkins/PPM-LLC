document.addEventListener('DOMContentLoaded', () => {
    // Populate estimate services only on pages containing the estimate form.
    const propertyTypeSelect = document.getElementById('propertyType');
    const serviceTypeSelect = document.getElementById('serviceType');

    if (propertyTypeSelect && serviceTypeSelect) {
        const servicesByProperty = {
            residential: ['House Washing', 'Roof Cleaning', 'Driveway Cleaning', 'Fence Cleaning', 'Deck Cleaning', 'Gutter Cleaning and Brightening', 'General Handyman Services'],
            commercial: ['Concrete Cleaning', 'Dumpster Pad Cleaning', 'Window Cleaning', 'Commercial Roof Washing', 'Gas Stations', 'Canopies', 'Parking Garages']
        };

        propertyTypeSelect.addEventListener('change', () => {
            serviceTypeSelect.replaceChildren(new Option('Select Service Type', ''));
            (servicesByProperty[propertyTypeSelect.value] || []).forEach(service => {
                serviceTypeSelect.add(new Option(service, service.toLowerCase().replace(/\s+/g, '_')));
            });
        });
    }

    // Keep the existing mobile menu behavior in sync with its checkbox.
    const menuToggle = document.getElementById('menuToggle');
    const menuCheckbox = document.getElementById('menuCheckbox');
    const menu = document.getElementById('menu');

    if (menuToggle && menuCheckbox && menu) {
        const syncMenu = () => {
            menu.classList.toggle('fullscreen', menuCheckbox.checked);
            document.body.classList.toggle('menu-open', menuCheckbox.checked);
        };

        menuCheckbox.addEventListener('change', syncMenu);
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuCheckbox.checked = false;
                syncMenu();
            });
        });
        syncMenu();
    }

    // Image previews are optional and should never interrupt other page scripts.
    const fileUpload = document.getElementById('fileupload');
    const filePreview = document.getElementById('filePreview');
    const removeFile = document.getElementById('removeFile');

    if (fileUpload && filePreview && removeFile) {
        fileUpload.addEventListener('change', () => {
            const file = fileUpload.files[0];
            filePreview.replaceChildren();
            removeFile.style.display = file ? 'inline' : 'none';
            if (!file) return;

            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = () => {
                    const img = document.createElement('img');
                    img.src = reader.result;
                    img.alt = 'Selected image preview';
                    img.style.maxWidth = '200px';
                    img.style.maxHeight = '200px';
                    filePreview.replaceChildren(img);
                };
                reader.readAsDataURL(file);
            } else {
                filePreview.textContent = 'Selected file: ' + file.name;
            }
        });
    }

    // Reveal sections on load and while scrolling.
    const reveals = document.querySelectorAll('.reveal');
    const reveal = () => {
        reveals.forEach(element => {
            const visible = element.getBoundingClientRect().top < window.innerHeight - 150;
            element.classList.toggle('active', visible);
        });
    };
    if (reveals.length) {
        window.addEventListener('scroll', reveal, { passive: true });
        window.addEventListener('load', reveal);
        reveal();
    }
});
