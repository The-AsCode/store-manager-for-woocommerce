<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInit8ca1004d92518d0dd9664a19c4b4e376
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        spl_autoload_register(array('ComposerAutoloaderInit8ca1004d92518d0dd9664a19c4b4e376', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInit8ca1004d92518d0dd9664a19c4b4e376', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInit8ca1004d92518d0dd9664a19c4b4e376::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}
