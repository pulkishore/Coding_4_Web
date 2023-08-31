<!DOCTYPE html>
<html lang="en-GB">
     <?php $thisPage="Da Vinci";?>
    <?php $thisSection="SECTION 1";?>
  <head>

    <meta name="description" content=" " />
    <meta name="keywords" content=" " />

    <title>D12.E1 · Multipage PHP website</title>
    <?php include("../php/meta.php");?>
 


   
  </head>

  <body>
    <header><a href="/">MULTIPAGE PHP WEBSITE</a></header>

    <div class="content-wrap">
      <main>
        <h1>Was Da Vinci Gay?</h1>

        <figure>
          <img src="/images/davinci1.jpeg" />
          <img src="/images/davinci2.webp" />
          <figcaption><em>From historyextra.com'</em></figcaption>
        </figure>

        <p>
         Leonardo da Vinci's sexuality has been a subject of speculation among historians. 
         While there is no definitive historical proof, several theories have emerged. 
         Some researchers suggest that his relationships with male students and artists, particularly his close association with Gian Giacomo Caprotti (known as Salaì), might indicate his homosexuality. 
         Leonardo's late painting of Saint John the Baptist and an erotic drawing of Salaì are often cited in support of this theory. Additionally, a 1476 court case involving Leonardo for sodomy contributes to the debate. However, it's essential to note that conclusive evidence regarding his sexuality is lacking, and interpretations remain speculative. His private life remains a topic of interest, with varying perspectives on his relationships with both men and women.
        </p>
      </main>

      <aside>
              <?php include("../php/nav.php");?>

        <br />
        <hr />
        <p class="s">(This is an extra paragraph in the aside element)</p>
      </aside>
    </div>

       <?php include("../php/footer.php");?>
  </body>
</html>

<!-- REFERENCE PHP CODE: -->
<!--
Declare variables
<?php $thisSection=""; ?>

Echo function w. if statement
<?php if ($thisPage!="") echo "$thisPage"; ?>

Include function
<?php include("php/something.php"); ?>

Add an ID to an element dynamically
<?php if ($thisPage=="Page One") echo " id=\"currentpage\""; ?>
Add this as an attribute within an element

Date
<?php
date_default_timezone_set('Asia/Kolkata');
echo "" . date("Y") ;
?>
-->
