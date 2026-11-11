document.addEventListener('DOMContentLoaded', () => {
  // 1. Seleksi Elemen DOM
  const form = document.getElementById('orderForm');
  const namaInput = document.getElementById('nama');
  const emailInput = document.getElementById('email');
  const produkSelect = document.getElementById('produk');
  const alertSuccess = document.getElementById('alertSuccess');
  const btnSubmit = document.getElementById('btnSubmit');

  // 2. Helper: Helper Validasi Format Email (Regex)
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // 3. Helper: Menampilkan atau Menghapus Class Error
  const toggleError = (element, isError) => {
    const group = element.parentElement;
    if (isError) {
      group.classList.add('error');
    } else {
      group.classList.remove('error');
    }
  };

  // 4. Real-time Validation (Menghapus pesan error saat pengguna mulai memperbaiki input)
  namaInput.addEventListener('input', () => {
    if (namaInput.value.trim() !== '') {
      toggleError(namaInput, false);
    }
  });

  emailInput.addEventListener('input', () => {
    if (isValidEmail(emailInput.value.trim())) {
      toggleError(emailInput, false);
    }
  });

  produkSelect.addEventListener('change', () => {
    if (produkSelect.value !== '') {
      toggleError(produkSelect, false);
    }
  });

  // 5. Handling Submit Form
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Mencegah reload halaman

    let isValid = true;

    // Validasi Nama Panggilan
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

    // Validasi Pilihan Produk
    if (produkSelect.value === '') {
      toggleError(produkSelect, true);
      isValid = false;
    } else {
      toggleError(produkSelect, false);
    }

    // Jika seluruh input valid
    if (isValid) {
      // Mengubah state tombol menjadi Loading
      btnSubmit.disabled = true;
      btnSubmit.innerText = 'Mengirim...';

      // Simulasi pengiriman data ke server (delay 1.5 detik)
      setTimeout(() => {
        // Kembalikan state tombol
        btnSubmit.disabled = false;
        btnSubmit.innerText = 'Kirim Pemesanan';

        // Tampilkan notifikasi sukses
        alertSuccess.style.display = 'block';

        // Reset semua isi form
        form.reset();

        // Sembunyikan notifikasi sukses secara otomatis setelah 5 detik
        setTimeout(() => {
          alertSuccess.style.display = 'none';
        }, 5000);
      }, 1500);
    }
  });
});
