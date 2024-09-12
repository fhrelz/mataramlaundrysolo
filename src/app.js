document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Setrika Uap", images: "1.png", price: 2350000, deks: "Detail Product/ barang." },
      { id: 2, name: "Setrika Uap", images: "2.png", price: 2350000, deks: "Detail Product/ barang." },
      { id: 3, name: "Setrika Uap", images: "3.png", price: 2350000, deks: "Detail Product/ barang." },
      { id: 4, name: "Produk 4", images: "4.png", price: 2350000, deks: "Detail Product/ barang." },
      { id: 5, name: "Mesin Pengering Model 1", images: "5.png", price: 6500000, deks: "Detail Product/ barang." },
      { id: 6, name: "Mesin Pengering Model 2", images: "6.png", price: 7800000, deks: "Detail Product/ barang." },
      { id: 7, name: "Mesin Pengering Model 3", images: "7.jpeg", price: 8770000, deks: "Detail Product/ barang." },
      { id: 8, name: "Mesin Pengering Model 4", images: "8.png", price: 5000000, deks: "Detail Product/ barang." },
      { id: 9, name: "Detergen Futer", images: "9.png", price: 54000, deks: "Detail Product/ barang." },
      { id: 10, name: "Detergen Taindr", images: "10.png", price: 71000, deks: "Detail Product/ barang." },
      { id: 11, name: "Detergen Tedicl", images: "11.png", price: 49000, deks: "Detail Product/ barang." },
      { id: 12, name: "Detergen Lander", images: "12.png", price: 28500, deks: "Detail Product/ barang." },
      { id: 13, name: "Detergen Blainde", images: "13.jpeg", price: 60000, deks: "Detail Product/ barang." },
      { id: 14, name: "Detergen Baridie", images: "14.png", price: 38000, deks: "Detail Product/ barang." },
      { id: 15, name: "Tinny detergen", images: "15.jpeg", price: 73000, deks: "Detail Product/ barang." },
      { id: 16, name: "detergen Cerfiug", images: "16.png", price: 61500, deks: "Detail Product/ barang." },
      { id: 177, name: "Meja Laundry Model 1", images: "17.png", price: 499000, deks: "Detail Product/ barang." },
      { id: 18, name: "Meja Laundry Model 2", images: "18.png", price: 1240000, deks: "Detail Product/ barang." },
      { id: 19, name: "Meja Laundry Model 3", images: "19.png", price: 810000, deks: "Detail Product/ barang." },
      { id: 20, name: "Rak Baju Minimalist", images: "20.png", price: 377000, deks: "Detail Product/ barang." },
      { id: 21, name: "Rak Baju Modern", images: "21.png", price: 229000, deks: "Detail Product/ barang." },
      { id: 22, name: "Rak Baju Simpel", images: "22.png", price: 300000, deks: "Detail Product/ barang." },
      { id: 23, name: "Rak Baju Tatakan", images: "23.png", price: 416000, deks: "Detail Product/ barang." },
      { id: 24, name: "Rak Baju Besi", images: "24.png", price: 271000, deks: "Detail Product/ barang." },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      //  cek apakah ada barang/produk yang sama di keranjang
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada/ keranjang kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada di keranjang, cek apakah ada barang yang sama di keranjang
        this.items = this.items.map((item) => {
          // jika terdapat barang berbeda di keranjang
          if (item.id !== newItem.id) {
            return item;
          } else {
            //  jika barang sudah ada di keranjang tambah quantity dan sub totoal
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // pilih item yang akan di hapus/remove berdasarkan id
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari satu
      if (cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          // jika bukan barang yang dipilih
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barang sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// kirim data ketika button  checkout diklick
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  window.open("http://wa.me/6281391204449?text=" + encodeURIComponent(message));
});

// format pesan whatsapp
const formatMessage = (obj) => {
  return `Data Customer
  Nama: ${obj.name}
  Email: ${obj.email}
  No Hp: ${obj.phone}
Data Pesanan:
  ${JSON.parse(obj.items).map(
    (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
  )}
Total: ${rupiah(obj.total)}
Terimakasih.`;
};

// konversi kerupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    // minimumFractionDigits: 0,
  }).format(number);
};
