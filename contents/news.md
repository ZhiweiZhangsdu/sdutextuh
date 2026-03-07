<ul class="news-list">   <!-- 假设外层有 ul 包裹，请根据实际情况添加 class -->
  <li data-target="paper-2026-1">
    <span class="news-tag paper">Paper</span>
    Our paper *“Title of the Paper”* has been accepted by
    *Journal Name*, 2026.
    [<a href="https://arxiv.org/abs/xxxx.xxxxx">arXiv</a>]
  </li>
  <li data-target="talk-2026-1">
    <span class="news-tag conference">Conference</span>
    Prof. Guanghui Wang will give an invited talk at
    *International Conference on Combinatorics and Graph Theory*,
    June 2026, Jinan, China.
  </li>
  <li data-target="workshop-2026-1">
    <span class="news-tag workshop">Workshop</span>
    The SDU Combinatorics Group will organize the
    *Workshop on Extremal and Probabilistic Combinatorics*,
    May 12–14, 2026, Jinan, China.
  </li>
  <li data-target="recruitment-2026-1">
    <span class="news-tag recruitment">Recruitment</span>
    We are recruiting **Ph.D. students and postdoctoral researchers**
    in combinatorics and graph theory.
    Interested applicants are welcome to contact us by email.
  </li>
  <!-- 2025 和 2024 的条目类似处理，分别赋予唯一 ID -->
  <li data-target="paper-2025-1">
    <span class="news-tag paper">Paper</span>
    *“Another Paper Title”* has been published in
    *Journal Name*, 2025.
  </li>
  <li data-target="award-2025-1">
    <span class="news-tag award">Award</span>
    One of our group members received the
    *Outstanding Graduate Student Award*.
  </li>
  <li data-target="member-2025-1">
    <span class="news-tag member">Member</span>
    We warmly welcome **Name** to join our group as a Ph.D. student.
  </li>
  <li data-target="conference-2024-1">
    <span class="news-tag conference">Conference</span>
    Members of our group participated in
    *International Workshop on Discrete Mathematics*,
    April 2024, Shanghai, China.
  </li>
</ul>
<section id="project-details">
  <h2>项目详情</h2>

  <div id="paper-2026-1" class="project-detail">
    <h3>Paper: "Title of the Paper"</h3>
    <p><strong>Authors:</strong> ...</p>
    <p><strong>Journal:</strong> Journal Name, 2026</p>
    <p><strong>Abstract:</strong> ...</p>
    <p><a href="https://arxiv.org/abs/xxxx.xxxxx">arXiv</a></p>
  </div>

  <div id="talk-2026-1" class="project-detail">
    <h3>Invited Talk by Prof. Guanghui Wang</h3>
    <p><strong>Conference:</strong> International Conference on Combinatorics and Graph Theory</p>
    <p><strong>Date:</strong> June 2026, Jinan, China</p>
    <p><strong>Abstract:</strong> ...</p>
  </div>

  <!-- 其他条目依此类推，id 必须与 data-target 一致 -->
</section>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // 获取新闻列表容器（如果 ul 没有 class，请改用 id 或更具体的选择器）
    const newsList = document.querySelector('.news-list');
    if (!newsList) return;

    newsList.addEventListener('click', function(e) {
      // 如果点击的是链接本身（如 arXiv），不干预，保留原行为
      if (e.target.tagName === 'A') return;

      // 找到被点击的 <li> 元素
      const li = e.target.closest('li');
      if (!li) return;

      const targetId = li.getAttribute('data-target');
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          e.preventDefault(); // 防止可能的默认行为（如链接跳转）
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

          // 可选：如果页面有固定导航栏，调整滚动偏移
          // window.scrollBy(0, -80);
        }
      }
    });
  });
</script>
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;  /* 如果页面顶部有固定导航栏，设置此值 */
}
