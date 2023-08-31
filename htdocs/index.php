<!DOCTYPE html>
<html lang="en-GB">
    <?php $thisPage="";?>
    <?php $thisSection="";?>
  <head>
        <meta name="description" content=" " />
    <meta name="keywords" content=" " />

  

    <title>D12.E1 · Multipage PHP website</title>
    <?php include("php/meta.php"); ?>


  </head>

  <body>
        <?php include("php/header.php"); ?>

    <div class="content-wrap">
      <main>
        <h1>This is the home page</h1>
      </main>

      <aside>
       <?php include("php/nav.php");?>
        <br />
        <hr />
        <p class="s">(This is an extra paragraph in the aside element)</p>
      </aside>
    </div>

       <?php include("php/footer.php");?>
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
?> -->

