function validateForm() {
    const name = document.forms["userForm"]["name"].value.trim();
    const email = document.forms["userForm"]["email"].value.trim();
    const age = document.forms["userForm"]["age"].value.trim();
    const message = document.forms["userForm"]["message"].value.trim();

    if (name === "" || email === "" || age === "" || message === "") {
        alert("All fields must be filled out.");
        return false;
    }

    if (age <= 0) {
        alert("Age must be a positive number.");
        return false;
    }

    if (message.length < 10) {
        alert("Message must be at least 10 characters long.");
        return false;
    }

    return true;
}
