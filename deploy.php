<?php
namespace Deployer;

require 'recipe/laravel.php';

// Config

set('repository', 'https://github.com/msamgan/ms0.git');

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

// Hosts

host('146.190.32.125')
    ->set('remote_user', 'ms0')
    ->set('deploy_path', '~/htdocs/ms0.org');

desc('Build the assets');
task('deploy:build', function () {
    cd('{{release_path}}');
    run('npm install');
    run('npm run build');
});

task('deploy:optimize', function () {
    cd('{{release_path}}');
    run('php artisan optimize');
});

// Hooks

after('deploy:update_code', 'deploy:build');
after('deploy:symlink', 'deploy:optimize');

after('deploy:failed', 'deploy:unlock');
