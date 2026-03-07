const content_dir = 'contents/';
const config_file = 'config.yml';
const section_names = ['home', 'members', 'conferences', 'workshops', 'seminars', 'news'];

window.addEventListener('DOMContentLoaded', event => {

    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    }

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);
            Object.keys(yml).forEach(key => {
                try {
                    document.getElementById(key).innerHTML = yml[key];
                } catch {
                    console.log("Unknown id and value: " + key + "," + yml[key].toString());
                }
            });
        })
        .catch(error => console.log(error));

    marked.use({ mangle: false, headerIds: false });

    section_names.forEach((name) => {
        fetch(content_dir + name + '.md')
            .then(response => response.text())
            .then(markdown => {
                const html = marked.parse(markdown);
                const container = document.getElementById(name + '-md');
                if (!container) return;

                container.innerHTML = html;

                if (['conferences', 'workshops', 'seminars'].includes(name)) {
                    formatItemsWithPoster(name + '-md');
                }

                if (window.MathJax) {
                    MathJax.typeset();
                }

                if (name === 'news') {
                    setTimeout(scrollToHashAfterRender, 0);
                }
            })
            .catch(error => console.log(error));
    });

    window.addEventListener('hashchange', scrollToHashAfterRender);
});

function scrollToHashAfterRender() {
    const hash = window.location.hash;
    if (!hash) return;

    const target = document.querySelector(hash);
    if (!target) return;

    target.scrollIntoView({
        behavior: 'auto',
        block: 'start'
    });
}

function formatItemsWithPoster(targetId) {
    const section = document.getElementById(targetId);
    if (!section) return;

    const html = section.innerHTML.trim().split("<li>").join("<!--split-->").split("<!--split-->");
    let result = "";

    html.forEach(block => {
        const posterMatch = block.match(/Poster:\s*(https?:\/\/[^\s<]+|static\/[^\s<]+)/);
        if (posterMatch) {
            const posterUrl = posterMatch[1];
            const cleanBlock = block.replace(/Poster:.*$/, "");
            result += `
            <div class="item-wrapper">
                <div class="item-text">${cleanBlock}</div>
                <img src="${posterUrl}" loading="lazy">
            </div>`;
        } else {
            result += block;
        }
    });

    section.innerHTML = result;
}
