document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('orderForm');
  const namaInput = document.getElementById('nama');
  const emailInput = document.getElementById('email');
  const produkSelect = document.getElementById('produk');
  const alertSuccess = document.getElementById('alertSuccess');
  const btnSubmit = document.getElementById('btnSubmit');

  // Helper validasi email
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Helper toggle class error
  const toggleError = (element, isError) => {
    const group = element.parentElement;
    if (isError) {
      group.classList.add('error');
    } else {
      group.classList.remove('error');
    }
  };

  // Real-time error removal
  namaInput.addEventListener('input', () => {
    if (namaInput.value.trim() !== '') toggleError(namaInput, false);
  });

  emailInput.addEventListener('input', () => {
    if (isValidEmail(emailInput.value.trim())) toggleError(emailInput, false);
  });

  produkSelect.addEventListener('change', () => {
    if (produkSelect.value !== '') toggleError(produkSelect, false);
  });

  // Submit Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validasi Nama
    if (namaInput.value.trim() === '') {
      toggleError(namaInput, true);
      isValid = false;
    } else {
      toggleError(namaInput, false);
    }

    // Validasi Email
    if (!isValidEmail(emailInput.value.trim())) {
      toggleError(emailInput, true);
      isValid = false;
    } else {
      toggleError(emailInput, false);
    }

    // Validasi Produk
    if (produkSelect.value === '') {
      toggleError(produkSelect, true);
      isValid = false;
    } else {
      toggleError(produkSelect, false);
    }

    // Jika valid, proses pengiriman
    if (isValid) {
      btnSubmit.disabled = true;
      btnSubmit.innerText = 'Mengirim...';

      setTimeout(() => {
        btnSubmit.disabled = false;
        btnSubmit.innerText = 'Kirim Pemesanan';

        if (alertSuccess) {
          alertSuccess.style.display = 'block';
        }

        form.reset();

        setTimeout(() => {
          if (alertSuccess) {
            alertSuccess.style.display = 'none';
          }
        }, 5000);
      }, 1500);
    }
  });
});
