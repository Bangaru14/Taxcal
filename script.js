document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const taxResult = document.getElementById('taxResult');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            calculateTax();
            showModal();
        }
    });

    closeModal.addEventListener('click', function() {
        closeModalFunc();
    });

    function validateForm() {
        let isValid = true;
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                const errorIcon = input.nextElementSibling;
                errorIcon.style.display = 'inline-block';
            } else {
                const errorIcon = input.nextElementSibling;
                errorIcon.style.display = 'none';
            }
        });
        const ageSelect = document.getElementById('age');
        if (ageSelect.value === '') {
            document.getElementById('ageError').style.display = 'inline-block';
            isValid = false;
        } else {
            document.getElementById('ageError').style.display = 'none';
        }
        return isValid;
    }

    function calculateTax() {
        const grossIncome = parseFloat(document.getElementById('grossIncome').value);
        const extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0;
        const deductions = parseFloat(document.getElementById('deductions').value) || 0;
        const ageGroup = document.getElementById('age').value;

        let taxableIncome = grossIncome + extraIncome - deductions - 8; // Initial tax-free 8 Lakhs

        if (taxableIncome <= 0) {
            taxResult.innerText = 'No tax applicable.';
        } else {
            let taxRate;
            if (ageGroup === '<40') {
                taxRate = 0.3;
            } else if (ageGroup === '>=40 & <60') {
                taxRate = 0.4;
            } else if (ageGroup === '>=60') {
                taxRate = 0.1;
            }

            const taxAmount = taxRate * taxableIncome;
            taxResult.innerText = `Tax Amount: ${taxAmount.toFixed(2)} Lakhs`;
        }
    }

    function showModal() {
        modal.style.display = 'block';
    }

    function closeModalFunc() {
        modal.style.display = 'none';
    }
});