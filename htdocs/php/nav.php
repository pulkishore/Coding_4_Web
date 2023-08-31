
        <nav>
          <p>POSTS:</p>
          <!-- section 1 menu-->
          <a class="sectiontitle" <?php if ($thisSection=="SECTION 1") echo " id=\"currentsection\""; ?>>Section 1</a>
          <ul>

            <li><a href="section1/artem.php"<?php if ($thisPage=="PAGE 1") echo " id=\"currentpage\""; ?>>Artem Kostyukevich</a></li>
            <li><a href="section1/davinci.php"<?php if ($thisPage=="PAGE 1") echo " id=\"currentpage\""; ?>>Da Vinci</a></li>

            <li><a href="section1/miura.php"<?php if ($thisPage=="PAGE 1") echo " id=\"currentpage\""; ?>>Kentaro Miura</a></li>
            <li><a href="">Page 3</a></li>
          </ul>

          <!-- section 2 menu-->
          <a class="sectiontitle">Section 2</a>
          <ul>
            <li><a href="">Page 1</a></li>
            <li><a href="">Page 2</a></li>
            <li><a href="">Page 3</a></li>
          </ul>

          <a href="">About</a>
    </nav>
  
