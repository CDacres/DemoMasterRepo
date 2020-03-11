<html>
    <body>
        <h1>Message:</h1>
        <?php echo $text;
        if (count($variables) > 0)
        {
            echo '<h1>Variables:</h1>';
            foreach ($variables as $key => $value)
            {
                echo '<p>' . $key . ': ' . $value . '</p>';
            }
        }
?>
    </body>
</html>