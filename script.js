/* =====================================================
   UNDANGAN PERNIKAHAN TEDY WAHYUDI & SITI HAMIMAH

   FITUR:
   1. Informasi pengantin
   2. Nama tamu dari URL
   3. Countdown pernikahan
   4. Musik undangan
   5. Animasi pembukaan undangan
   6. Navigasi bawah
   7. Form RSVP Google Spreadsheet
   ===================================================== */


/* =====================================================
   1. DATA PERNIKAHAN
   ===================================================== */

const WEDDING = {
    groom: "Tedy Wahyudi",
    groomParents: "Putra dari Bapak XXX dan Ibu XXX",

    bride: "Siti Hamimah",
    brideParents: "Putri dari Bapak YYY dan Ibu YYY",

    date: "Minggu, 3 Januari 2027",

    isoDate: "2027-01-03T10:00:00+07:00",

    holyMatrimony: {
        venue: "[Isi lokasi akad nikah]",
        time: "[Isi waktu]",
        map: ""
    },

    luncheon: {
        venue: "[Isi lokasi resepsi]",
        time: "[Isi waktu]",
        map: ""
    },

    // Masukkan URL Web App Google Apps Script
    appsScriptUrl: "PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE"
};


/* =====================================================
   2. FUNGSI DASAR
   ===================================================== */

function getElement(id) {
    return document.getElementById(id);
}


function setText(id, value) {
    const element = getElement(id);

    if (element) {
        element.textContent = value;
    }
}


/* =====================================================
   3. MENAMPILKAN DATA PERNIKAHAN
   ===================================================== */

function applyWeddingDetails() {

    const groomFirst = WEDDING.groom.split(" ")[0];
    const brideFirst = WEDDING.bride.split(" ")[0];

    const introCouple = getElement("intro-couple");

    if (introCouple) {
        introCouple.replaceChildren(
            document.createTextNode(groomFirst + " "),

            Object.assign(
                document.createElement("i"),
                { textContent: "&" }
            ),

            document.createTextNode(" " + brideFirst)
        );
    }

    setText("intro-date", WEDDING.date);

    setText("groom-name", WEDDING.groom);
    setText("groom-parents", WEDDING.groomParents);

    setText("bride-name", WEDDING.bride);
    setText("bride-parents", WEDDING.brideParents);

    setText(
        "closing-couple",
        WEDDING.groom + " & " + WEDDING.bride
    );

    setText(
        "holy-time",
        "Pukul " + WEDDING.holyMatrimony.time
    );

    setText(
        "holy-venue",
        WEDDING.holyMatrimony.venue
    );

    setText(
        "lunch-time",
        "Pukul " + WEDDING.luncheon.time
    );

    setText(
        "lunch-venue",
        WEDDING.luncheon.venue
    );

    setMapLink(
        "holy-map",
        WEDDING.holyMatrimony.map
    );

    setMapLink(
        "lunch-map",
        WEDDING.luncheon.map
    );
}


/* =====================================================
   4. LINK GOOGLE MAPS
   ===================================================== */

function setMapLink(id, url) {

    const link = getElement(id);

    if (!link) return;

    if (
        typeof url === "string" &&
        /^https:\/\/\S+/i.test(url)
    ) {
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        link.removeAttribute("aria-disabled");

    } else {
        link.href = "#";

        link.setAttribute(
            "aria-disabled",
            "true"
        );
    }
}


/* =====================================================
   5. NAMA TAMU DARI URL
   Contoh:
   domain.com/?to=Shafira%20dan%20Partner
   ===================================================== */

function setGuestName() {

    const params = new URLSearchParams(
        window.location.search
    );

    const guestName =
        params.get("to") ||
        params.get("nama") ||
        "Tamu Undangan";

    const cleanName = guestName
        .trim()
        .slice(0, 100) || "Tamu Undangan";

    // Tampilkan nama pada halaman pembuka
    setText("guest-name", cleanName);

    // Isi otomatis nama pada formulir RSVP
    const rsvpName = getElement("rsvp-name");

    if (
        rsvpName &&
        cleanName !== "Tamu Undangan"
    ) {
        rsvpName.value = cleanName;
    }
}


/* =====================================================
   6. COUNTDOWN PERNIKAHAN
   ===================================================== */

function updateCountdown() {

    const targetDate = new Date(
        WEDDING.isoDate
    ).getTime();

    if (!Number.isFinite(targetDate)) return;

    const now = Date.now();

    const difference = Math.max(
        0,
        targetDate - now
    );

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    setText(
        "days",
        String(days).padStart(3, "0")
    );

    setText(
        "hours",
        String(hours).padStart(2, "0")
    );

    setText(
        "minutes",
        String(minutes).padStart(2, "0")
    );

    setText(
        "seconds",
        String(seconds).padStart(2, "0")
    );
}


/* =====================================================
   7. MUSIK UNDANGAN
   ===================================================== */

function updateMusicButton() {

    const audio = getElement("wedding-audio");
    const button = getElement("music-toggle");

    if (!audio || !button) return;

    if (audio.paused) {
        button.innerHTML =
            '♫ <span>Musik jeda</span>';
    } else {
        button.innerHTML =
            '♫ <span>Musik aktif</span>';
    }
}


function setupMusic() {
    const audio = document.getElementById("wedding-audio");
    const musicButton = document.getElementById("music-toggle");
    const musicIcon = document.getElementById("music-icon");

    if (!audio) return;

    function updateIcon() {
        if (audio.paused) {
            if (musicIcon) musicIcon.textContent = "🔇";
            if (musicButton) musicButton.title = "Nyalakan musik";
        } else {
            if (musicIcon) musicIcon.textContent = "🔊";
            if (musicButton) musicButton.title = "Matikan musik";
        }
    }

    // Mencoba memutar musik saat halaman pertama kali dibuka
    audio.volume = 1;
    audio.muted = false;

    audio.play()
        .then(() => {
            console.log("Musik berhasil diputar otomatis");
            updateIcon();
        })
        .catch((error) => {
            console.warn("Browser memblokir autoplay:", error);
            updateIcon();
        });

    // Tombol speaker untuk mengontrol musik
    if (musicButton) {
        musicButton.onclick = async function () {
            try {
                if (audio.paused) {
                    await audio.play();
                } else {
                    audio.pause();
                }
            } catch (error) {
                console.error(error);
            }

            updateIcon();
        };
    }

    audio.addEventListener("play", updateIcon);
    audio.addEventListener("pause", updateIcon);

    updateIcon();
}

/* =====================================================
   8. MEMBUKA UNDANGAN
   ===================================================== */


function setupOpening() {

    const button = getElement("open-invitation");
    const intro = getElement("intro");
    const invitation = getElement("invitation");
    const navigation = document.querySelector(".bottom-nav");
    const audio = getElement("wedding-audio");

    if (!button || !invitation) return;

    if (button.dataset.openingReady === "true") return;

    button.dataset.openingReady = "true";

    button.addEventListener("click", async function () {

        if (button.disabled) return;

        // Buka animasi halaman intro
        if (intro) {
            intro.classList.add("opened");
        }

        // Tampilkan isi undangan
        invitation.classList.add("visible");
        invitation.setAttribute("aria-hidden", "false");

        button.disabled = true;
        button.textContent = "Undangan Dibuka";

        // Tampilkan navigasi bawah
        if (navigation) {
            navigation.classList.add("visible");
        }

        // LANGSUNG PUTAR MUSIK SAAT TOMBOL DIKLIK
        if (audio) {
            audio.volume = 0.8;

            try {
                await audio.play();
                updateMusicButton();

            } catch (error) {
                console.warn("Musik belum dapat diputar:", error);
            }
        }

        // Scroll ke bagian mempelai
        setTimeout(function () {

            const couple =
                getElement("mempelai") ||
                document.querySelector(".couple");

            if (couple) {
                couple.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        }, 500);

    });
}

/* =====================================================
   9. NAVIGASI BAWAH
   ===================================================== */

function setupNavigation() {

    const navItems = document.querySelectorAll(
        ".nav-item"
    );

    navItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function (event) {

                const targetId = item.dataset.target;

                if (!targetId) return;

                const target = getElement(targetId);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        );
    });


    // Mengubah menu aktif sesuai halaman yang terlihat
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) return;

                navItems.forEach(function (item) {

                    const isActive =
                        item.dataset.target === entry.target.id;

                    item.classList.toggle(
                        "active",
                        isActive
                    );
                });
            });
        },

        {
            rootMargin: "-35% 0px -45% 0px"
        }
    );


    navItems.forEach(function (item) {

        const targetId = item.dataset.target;

        if (!targetId) return;

        const section = getElement(targetId);

        if (section) {
            observer.observe(section);
        }
    });
}


/* =====================================================
   10. FORM RSVP
   ===================================================== */

function setupRSVP() {

    const form = getElement("rsvp-form");

    if (!form) return;

    // Mencegah event submit terpasang dua kali
    if (form.dataset.rsvpReady === "true") return;

    form.dataset.rsvpReady = "true";

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const message = getElement("rsvp-message");

            const button = form.querySelector(
                'button[type="submit"]'
            );

            const payload = {

                name:
                    getElement("rsvp-name")?.value.trim() || "",

                attendance:
                    getElement("attendance")?.value || "",

                pax:
                    getElement("pax")?.value || "1",

                message:
                    getElement("rsvp-message-text")?.value.trim() || ""
            };


            // Validasi nama dan kehadiran
            if (
                !payload.name ||
                !payload.attendance
            ) {

                if (message) {
                    message.textContent =
                        "Mohon lengkapi nama dan konfirmasi kehadiran.";
                }

                return;
            }


            // Periksa URL Google Apps Script
            if (
                !WEDDING.appsScriptUrl ||
                WEDDING.appsScriptUrl.includes("PASTE_")
            ) {

                if (message) {
                    message.textContent =
                        "RSVP belum terhubung ke Google Spreadsheet.";
                }

                return;
            }


            if (message) {
                message.textContent =
                    "Mengirim konfirmasi...";
            }

            if (button) {
                button.disabled = true;
                button.textContent = "Mengirim...";
            }


            try {

                await fetch(
                    WEDDING.appsScriptUrl,
                    {
                        method: "POST",

                        mode: "no-cors",

                        headers: {
                            "Content-Type":
                                "application/x-www-form-urlencoded;charset=UTF-8"
                        },

                        body: new URLSearchParams(
                            payload
                        ).toString()
                    }
                );


                if (message) {
                    message.textContent =
                        "Permintaan RSVP telah dikirim. Terima kasih!";
                }

                form.reset();

            } catch (error) {

                console.error(
                    "Gagal mengirim RSVP:",
                    error
                );

                if (message) {
                    message.textContent =
                        "Pengiriman gagal. Silakan coba kembali.";
                }

            } finally {

                if (button) {
                    button.disabled = false;
                    button.textContent = "Kirim RSVP";
                }
            }
        }
    );
}


/* =====================================================
   11. INISIALISASI WEBSITE
   ===================================================== */

function initializeWeddingInvitation() {

    // Tampilkan informasi pengantin
    applyWeddingDetails();

    // Ambil nama tamu dari URL
    setGuestName();

    // Jalankan countdown
    updateCountdown();

    // Aktifkan musik
    setupMusic();

    // Aktifkan tombol pembukaan undangan
    setupOpening();

    // Aktifkan navigasi bawah
    setupNavigation();

    // Aktifkan formulir RSVP
    setupRSVP();

    // Perbarui countdown setiap detik
    window.setInterval(
        updateCountdown,
        1000
    );
}


/* =====================================================
   12. JALANKAN SETELAH HTML SELESAI DIMUAT
   ===================================================== */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeWeddingInvitation,
        { once: true }
    );

} else {

    initializeWeddingInvitation();
}
