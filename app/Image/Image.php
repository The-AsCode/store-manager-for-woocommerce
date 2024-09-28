<?php

namespace STORE_MANAGER\App\Image;

class Image {

    public function __construct($base_dir, $json_file) {
        $this->generate_badge_json($base_dir, $json_file);
    }

    /**
     * Generate a JSON file with badge image data.
     *
     * @param string $base_dir The base directory where badge images are stored.
     * @param string $json_file The path to the JSON file to be generated.
     * @return void
     */
    public function generate_badge_json($base_dir, $json_file) {
        $badges = [];
    
        // Scan through the base directory
        $categories = scandir($base_dir);
    
        foreach ($categories as $category) {
            if ($category === '.' || $category === '..') {
                continue;
            }
    
            $category_path = $base_dir . DIRECTORY_SEPARATOR . $category;
            if (is_dir($category_path)) {
                $images = scandir($category_path);
                $category_badges = [];
    
                foreach ($images as $image) {
                    if ($image === '.' || $image === '..' || !is_file($category_path . DIRECTORY_SEPARATOR . $image)) {
                        continue;
                    }
    
                    // Extract the image name without extension
                    $image_name = pathinfo($image, PATHINFO_FILENAME);
                    $image_src = str_replace($base_dir . DIRECTORY_SEPARATOR, '', $category_path) . DIRECTORY_SEPARATOR . $image;
    
                    // Add image data to the category-based array
                    $category_badges[] = [
                        'name' => $image_name,
                        'src'  => $image_src
                    ];
                }
    
                if (!empty($category_badges)) {
                    // Add the category with its badges as a flat list
                    $badges[$category] = $category_badges;
                }
            }
        }
    
        // Write only the badges data to the file
        $json_data = json_encode(['badges' => $badges], JSON_PRETTY_PRINT);
        file_put_contents($json_file, $json_data);
    } 

}