const content_dir = 'contents/';
const config_file = 'config.yml';
const section_names = ['home', 'members', 'conferences', 'workshops', 'seminars', 'news'];

window.addEventListener('DOMContentLoaded', () => {

    // Bootstrap scrollspy
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav && window.bootstrap) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    }

    // Collapse responsive navbar
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );

    responsiveNavItems.forEach(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Load config.yml
    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);
            Object.keys(yml).forEach(key => {
                const el = document.getElementById(key);
                if (el) {
                    el.innerHTML = yml[key];
                }
            });
        })
        .catch(error => console.log('YAML load error:', error));

    // Marked options
    if (window.marked) {
        marked.use({ mangle: false, headerIds: false });
    }

    // Load markdown sections
    section_names.forEach((name) => {
        const container = document.getElementById(name + '-md');

        // 当前页面没有这个容器，就跳过
        if (!container) return;

        fetch(content_dir + name + '.md')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${name}.md`);
                }
                return response.text();
            })
            .then(markdown => {
                if (!window.marked) {
                    throw new Error('marked is not loaded');
                }

                const html = marked.parse(markdown);
                container.innerHTML = html;

                // Poster formatting
                if (['conferences', 'workshops', 'seminars'].includes(name)) {
                    formatItemsWithPoster(name + '-md');
                }

                // MathJax
                if (window.MathJax && typeof MathJax.typeset === 'function') {
                    MathJax.typeset();
                }

                // News anchor jump after render
                if (name === 'news') {
                    setTimeout(scrollToHashAfterRender, 50);
                }
            })
            .catch(error => console.log(`Markdown load error (${name}):`, error));
    });

    // support clicking hash links later
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

    const raw = section.innerHTML.trim();
    if (!raw) return;

    const htmlBlocks = raw.split("<li>").join("<!--split-->").split("<!--split-->");
    let result = "";

    htmlBlocks.forEach(block => {
        const posterMatch = block.match(/Poster:\s*(https?:\/\/[^\s<]+|static\/[^\s<]+)/);
        if (posterMatch) {
            const posterUrl = posterMatch[1];
            const cleanBlock = block.replace(/Poster:.*$/, "");
            result += `
                <div class="item-wrapper">
                    <div class="item-text">${cleanBlock}</div>
                    <img src="${posterUrl}" loading="lazy">
                </div>
            `;
        } else {
            result += block;
        }
    });

    section.innerHTML = result;
}
