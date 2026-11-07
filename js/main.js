/**
 * Dr. Kalpesh Purbiya - Spine & Sports Injuries Physiotherapy Center
 * Modern Mobile-First Interactive Script (Static, No Backend Required)
 */

(function ($) {
    "use strict";

    // 1. Hide Loading Spinner
    $(window).on('load', function () {
        if ($('#spinner').length > 0) {
            $('#spinner').removeClass('show');
        }
    });
    // Fallback if load event already fired
    setTimeout(function () {
        if ($('#spinner').length > 0) {
            $('#spinner').removeClass('show');
        }
    }, 600);

    // 2. Desktop Sticky Navbar on Scroll
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 30) {
            $('.desktop-navbar').addClass('is-scrolled');
        } else {
            $('.desktop-navbar').removeClass('is-scrolled');
        }
    });

    // 3. Highlight Current Bottom Nav Item Based on Current Page
    $(document).ready(function () {
        var currentPath = window.location.pathname.split("/").pop();
        if (!currentPath || currentPath === "" || currentPath === "index.html") {
            currentPath = "index.html";
        }

        var navTarget = currentPath;
        if (currentPath === 'team.html') {
            navTarget = 'about.html';
        }

        $('.bottom-nav-item, .glass-nav-item').each(function () {
            var href = $(this).attr('href');
            if (href === navTarget || (navTarget === "index.html" && href === "index.html")) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });

        // Highlight Desktop Navbar Active Link
        $('.desktop-nav-link').each(function () {
            var href = $(this).attr('href');
            if (href === currentPath || (currentPath === "index.html" && href === "index.html")) {
                $('.desktop-nav-link').removeClass('active');
                $(this).addClass('active');
            }
        });

        // Interactive Service Category Filter Chips (Smooth Mobile Experience)
        $('.service-filter-chip').on('click', function () {
            $('.service-filter-chip').removeClass('active');
            $(this).addClass('active');

            var filter = $(this).attr('data-service-filter');
            if (filter === 'all') {
                $('.service-card-col').fadeIn(250);
            } else {
                $('.service-card-col').hide();
                $('.service-card-col[data-service-category="' + filter + '"]').fadeIn(250);
            }
        });
    });

    // 4. Interactive Image Lightbox (Pure Vanilla JS / jQuery, Zero Dependencies)
    $(document).ready(function () {
        // Create lightbox markup if not present
        if ($('#customLightbox').length === 0) {
            $('body').append(`
                <div id="customLightbox" class="custom-lightbox" role="dialog" aria-modal="true" aria-label="Image Preview">
                    <div class="lightbox-content-box">
                        <button type="button" class="lightbox-close-btn" id="lightboxCloseBtn" aria-label="Close preview">
                            <i class="fas fa-times"></i>
                        </button>
                        <img id="lightboxImg" src="" alt="Enlarged view">
                    </div>
                </div>
            `);
        }

        // Open Lightbox on gallery card click
        $(document).on('click', '[data-lightbox-src]', function (e) {
            e.preventDefault();
            var src = $(this).attr('data-lightbox-src') || $(this).find('img').attr('src');
            if (src) {
                $('#lightboxImg').attr('src', src);
                $('#customLightbox').addClass('is-open');
                $('body').css('overflow', 'hidden');
            }
        });

        // Close Lightbox
        function closeLightbox() {
            $('#customLightbox').removeClass('is-open');
            $('body').css('overflow', '');
        }

        $(document).on('click', '#lightboxCloseBtn', closeLightbox);
        $(document).on('click', '#customLightbox', function (e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
        $(document).on('keydown', function (e) {
            if (e.key === "Escape" && $('#customLightbox').hasClass('is-open')) {
                closeLightbox();
            }
        });
    });

    // 5. Appointment Booking Form Handler (Static WhatsApp Dispatch with Form Validation)
    $(document).ready(function () {
        var appointmentForm = document.getElementById("appointmentBookingForm");
        if (appointmentForm) {
            appointmentForm.addEventListener("submit", function (e) {
                e.preventDefault();

                var nameEl = document.getElementById("aptName");
                var phoneEl = document.getElementById("aptPhone");
                var serviceEl = document.getElementById("aptService");
                var dateEl = document.getElementById("aptDate");
                var timeEl = document.getElementById("aptTime");
                var messageEl = document.getElementById("aptMessage");
                var statusAlert = document.getElementById("appointmentStatusAlert");

                var name = nameEl ? nameEl.value.trim() : "";
                var phone = phoneEl ? phoneEl.value.trim() : "";
                var service = serviceEl ? serviceEl.options[serviceEl.selectedIndex].text : "General Consultation";
                var date = dateEl ? dateEl.value : "";
                var time = timeEl ? timeEl.value : "";
                var message = messageEl ? messageEl.value.trim() : "";

                // Basic Validation
                if (!name || name.length < 2) {
                    showAlert(statusAlert, "Please enter your full name.", "danger");
                    if (nameEl) nameEl.focus();
                    return;
                }

                // Phone Validation (Indian 10-digit number check)
                var cleanPhone = phone.replace(/[^0-9]/g, "");
                if (cleanPhone.length < 10) {
                    showAlert(statusAlert, "Please enter a valid 10-digit mobile phone number.", "danger");
                    if (phoneEl) phoneEl.focus();
                    return;
                }

                // Construct clean WhatsApp message
                var waMessage = `*New Appointment Request - Spine & Sports Physiotherapy Center*\n\n` +
                    `👤 *Patient Name:* ${name}\n` +
                    `📱 *Phone Number:* ${phone}\n` +
                    `🩺 *Treatment / Service:* ${service}\n` +
                    `📅 *Preferred Date:* ${date ? date : "Earliest Available"}\n` +
                    `⏰ *Preferred Time:* ${time ? time : "Anytime"}\n`;

                if (message) {
                    waMessage += `📝 *Symptoms / Notes:* ${message}\n`;
                }
                waMessage += `\n_Sent from clinic website (drkalpeshpurbiya.vercel.app)_`;

                var doctorWhatsApp = "919414308289";
                var whatsappUrl = "https://wa.me/" + doctorWhatsApp + "?text=" + encodeURIComponent(waMessage);

                showAlert(statusAlert, "Redirecting to WhatsApp to send your appointment details to Dr. Kalpesh Purbiya...", "success");

                setTimeout(function () {
                    window.open(whatsappUrl, "_blank");
                    appointmentForm.reset();
                }, 600);
            });
        }

        // Contact Page Form Handler
        var contactForm = document.getElementById("contactInquiryForm");
        if (contactForm) {
            contactForm.addEventListener("submit", function (e) {
                e.preventDefault();

                var nameEl = document.getElementById("contactName");
                var phoneEl = document.getElementById("contactPhone");
                var subjectEl = document.getElementById("contactSubject");
                var messageEl = document.getElementById("contactMessage");
                var statusAlert = document.getElementById("contactStatusAlert");

                var name = nameEl ? nameEl.value.trim() : "";
                var phone = phoneEl ? phoneEl.value.trim() : "";
                var subject = subjectEl ? subjectEl.value.trim() : "General Inquiry";
                var message = messageEl ? messageEl.value.trim() : "";

                if (!name) {
                    showAlert(statusAlert, "Please enter your name.", "danger");
                    return;
                }
                var cleanPhone = phone.replace(/[^0-9]/g, "");
                if (cleanPhone.length < 10) {
                    showAlert(statusAlert, "Please enter a valid 10-digit phone number.", "danger");
                    return;
                }

                var waMessage = `*New Contact Inquiry - Spine & Sports Physiotherapy Center*\n\n` +
                    `👤 *Name:* ${name}\n` +
                    `📱 *Phone:* ${phone}\n` +
                    `🩺 *Subject / Condition:* ${subject}\n` +
                    `💬 *Message:* ${message ? message : "I would like to inquire about treatments."}\n\n` +
                    `_Sent from website contact form_`;

                var doctorWhatsApp = "919414308289";
                var whatsappUrl = "https://wa.me/" + doctorWhatsApp + "?text=" + encodeURIComponent(waMessage);

                showAlert(statusAlert, "Opening WhatsApp to send your inquiry to Dr. Kalpesh Purbiya...", "success");

                setTimeout(function () {
                    window.open(whatsappUrl, "_blank");
                    contactForm.reset();
                }, 600);
            });
        }

        function showAlert(el, msg, type) {
            if (!el) return;
            el.className = "form-status-alert " + (type === "success" ? "alert-success-custom" : "alert-danger-custom");
            el.textContent = msg;
            el.style.display = "block";
        }
    
    // ==========================================
    // MOBILE SLIDING DRAWER NAVIGATION (Right to Left Animation)
    // ==========================================
    function openMobileDrawer() {
        $('#mobileDrawer').addClass('open');
        $('#mobileDrawerOverlay').addClass('active');
        $('body').addClass('drawer-open');
    }

    function closeMobileDrawer() {
        $('#mobileDrawer').removeClass('open');
        $('#mobileDrawerOverlay').removeClass('active');
        $('body').removeClass('drawer-open');
    }

    // Toggle Button Click
    $(document).on('click', '#mobileMenuToggle', function (e) {
        e.preventDefault();
        openMobileDrawer();
    });

    // Close Button Click
    $(document).on('click', '#mobileDrawerClose', function (e) {
        e.preventDefault();
        closeMobileDrawer();
    });

    // Overlay Click to Close
    $(document).on('click', '#mobileDrawerOverlay', function () {
        closeMobileDrawer();
    });

    // Escape Key Listener to Close
    $(document).on('keydown', function (e) {
        if (e.key === "Escape" || e.keyCode === 27) {
            closeMobileDrawer();
        }
    });

    // Auto-close on Drawer Link Click & Smooth Scroll for In-Page Anchors
    $(document).on('click', '.drawer-nav-link', function (e) {
        var href = $(this).attr('href');
        
        // If same-page hash link
        if (href && href.indexOf('#') !== -1) {
            var parts = href.split('#');
            var page = parts[0];
            var hash = parts[1];
            
            var cur = window.location.pathname.split("/").pop();
            if (!cur || cur === "" || cur === "index.html") cur = "index.html";
            
            if (page === "" || page === cur || (page === "index.html" && cur === "index.html")) {
                var target = $('#' + hash);
                if (target.length) {
                    e.preventDefault();
                    closeMobileDrawer();
                    setTimeout(function() {
                        $('html, body').animate({
                            scrollTop: target.offset().top - 80
                        }, 500);
                    }, 350);
                    return;
                }
            }
        }

        // Close drawer for navigation
        closeMobileDrawer();
    });

    // Highlight Active Link in Drawer
    var curDrawerPath = window.location.pathname.split("/").pop();
    if (!curDrawerPath || curDrawerPath === "" || curDrawerPath === "index.html") {
        curDrawerPath = "index.html";
    }
    $('.drawer-nav-link').each(function () {
        var href = $(this).attr('href');
        if (href === curDrawerPath || (curDrawerPath === "index.html" && href === "index.html")) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });

});

})(jQuery);
