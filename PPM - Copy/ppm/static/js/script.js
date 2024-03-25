document.addEventListener("DOMContentLoaded", function () {
    const quoteForm = document.getElementById("quote-form");

    quoteForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Client-side validation
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        const image = document.getElementById("image").files[0];

        if (!name || !email || !message) {
            alert("Please fill in all required fields.");
            return;
        }

        // Send the data to the server using fetch
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("message", message);
        formData.append("image", image);

        fetch('/submit_quote', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response here (e.g., show a success message)
            alert(data.message);
            quoteForm.reset(); // Clear the form after successful submission
        })
        .catch(error => {
            // Handle errors (e.g., show an error message)
            alert("An error occurred. Please try again later.");
        });
    });
});
