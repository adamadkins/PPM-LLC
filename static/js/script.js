document.addEventListener('DOMContentLoaded', () => {
    // Populate estimate services only on pages containing the estimate form.
    const propertyTypeSelect = document.getElementById('propertyType');
    const serviceTypeSelect = document.getElementById('serviceType');

    if (propertyTypeSelect && serviceTypeSelect) {
        const servicesByProperty = {
            residential: ['House Washing / Soft Washing', 'Roof Soft Washing', 'Driveway & Sidewalk Cleaning', 'Patio & Pool Deck Cleaning', 'Deck Cleaning', 'Fence Cleaning', 'Gutter Exterior Cleaning & Brightening', 'Other Exterior Cleaning'],
            commercial: ['Building Exterior Washing', 'Commercial Concrete & Sidewalk Cleaning', 'Parking Lot & Garage Cleaning', 'Dumpster Pad Cleaning', 'Storefront & Entryway Cleaning', 'Gas Station & Canopy Cleaning', 'Commercial Roof Soft Washing', 'Other Commercial Exterior Cleaning']
        };

        propertyTypeSelect.addEventListener('change', () => {
            serviceTypeSelect.replaceChildren(new Option('Select Service Type', ''));
            (servicesByProperty[propertyTypeSelect.value] || []).forEach(service => {
                serviceTypeSelect.add(new Option(service, service.toLowerCase().replace(/\s+/g, '_')));
            });
        });
    }

    const menuButton = document.getElementById('menuButton');
    const siteMenu = document.getElementById('siteMenu');
    if (menuButton && siteMenu) {
        const setOpen = open => {
            menuButton.setAttribute('aria-expanded', String(open));
            menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
            siteMenu.classList.toggle('is-open', open);
            document.body.classList.toggle('menu-open', open);
        };
        menuButton.addEventListener('click', () => setOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
        siteMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
        window.addEventListener('resize', () => { if (window.innerWidth > 899) setOpen(false); });
        document.addEventListener('click', event => {
            if (!menuButton.contains(event.target) && !siteMenu.contains(event.target)) setOpen(false);
        });
    }
    document.querySelectorAll('.current-year').forEach(el => { el.textContent = new Date().getFullYear(); });

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
