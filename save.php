<?php

  $file_name = "data.txt";

  $entries_from_file = file_get_contents($file_name);
  //massiiv olemasolevate purkidega
  $entries = json_decode($entries_from_file);
  var_dump($entries);


?>
