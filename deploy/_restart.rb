# deploy/after_restart.rb
Chef::Log.info("Elisse on OpsWorks running after deployment")

execute "npm install" do
  cwd release_path
  user "deploy"
  environment "NODE_ENV" => 'production'
  command "npm install"
end

execute "build dist with gulp" do
  cwd release_path
  user "deploy"
  environment "NODE_ENV" => 'production'
  command "/srv/www/elisse/current/node_modules/.bin/gulp build"
end

execute "ensure config directory exists" do
  cwd release_path
  user "root"
  command "mkdir -p /var/www/elisse"
end

execute "set the config file" do
  cwd release_path
  user "root"

  enable_site = <<-enable_site
server {
  listen   80 default_server;
  server_name  127.0.0.1;
  access_log  /var/log/nginx/localhost.access.log;
  location / {
    root   /var/www/elisse;
    index  index.html index.htm;
  }
}
  enable_site

  command "echo '#{enable_site}' > /etc/nginx/sites-enabled/elisse"
end

execute "copy gulp generated dist directory to nginx" do
  cwd release_path
  user "root"
  command "cp -Rf /srv/www/elisse/current/dist/* /var/www/elisse"
end

execute "restart nginx" do
  cwd release_path
  command "/etc/init.d/nginx restart"
end
