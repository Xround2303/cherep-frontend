%define _sv_user               svyazcom
%define _sv_group              %{_sv_user}
%define _sv_prefix             /opt/%{_sv_user}
%define _sv_confdir            %{_sv_prefix}/etc
%define _sv_bindir             %{_sv_prefix}/bin
%define _sv_datadir            %{_sv_prefix}/share
%define _sv_libdir             %{_sv_prefix}/lib
%define _sv_libexecdir         %{_sv_prefix}/libexec
%define _sv_includedir         %{_sv_prefix}/include
%define _sv_mandir             %{_sv_prefix}/share/man
%define _sv_sbindir            %{_sv_confdir}/rc.d
%define _sv_localstatedir      %{_sv_prefix}/var
%define _sv_sitedir            %{_sv_localstatedir}/www
%define _sv_systemd_libdir     %{_sv_libdir}/systemd
%define _sv_motinoring_libdir  %{_sv_libdir}/monitoring
%define _sv_motinoring_confdir %{_sv_confdir}/monitoring.d
%define _sv_nginx_confdir      %{_sv_confdir}/nginx.d
%define _sv_php_fpm_confdir    %{_sv_confdir}/php-fpm.d

# Don't build debug package
%define debug_package %{nil}
# Exclude build link from package (for CentOS 8)
%define _build_id_links none
%global __os_install_post /usr/lib/rpm/brp-compress %{nil}

%define _sv_application_dir %{_sv_sitedir}/%{_sv_app_path}

Name:           %{_sv_pkgname}
Version:        %{_sv_version}
Release:        1%{?dist}
Summary:        UI-kit Web Interface
License:        Copyright (c) 2008-2021 Svyazcom, LLC. All rights reserved.
Vendor:         Svyazcom, LLC
Source0:        %{_sv_pkgname}-%{_sv_version}.tar.gz

%description
UI-kit Web Interface

%prep
%setup -q -c

%build
# https://unix.stackexchange.com/questions/296967/how-to-recursively-remove-execute-permissions-from-files-without-touching-folder
# The command I eventually used to restore permissions to normal: `chmod -R a-x+X,u-x+rwX,go-wx+rX directory/ name` – gaazkam Jul 19 '16 at 23:16
chmod -R a-x+X,u-x+rwX,go-wx+rX .

%install
%{__mkdir_p} %{buildroot}%{_sv_confdir}
%{__mkdir_p} %{buildroot}%{_sv_nginx_confdir}
%{__cp} storybook/dist/ci_configs/nginx.d/ui-kit.conf %{buildroot}%{_sv_nginx_confdir}/ui-kit.conf
rm -r storybook/dist/ci_configs
%{__mkdir_p} %{buildroot}%{_sv_application_dir}/storybook
%{__cp} -r storybook/dist/*    %{buildroot}%{_sv_application_dir}/storybook

%pre
# Create 'svyazcom' user if don't exists
getent passwd %{_sv_user} >/dev/null 2>&1 || useradd -c 'Svyazcom Work User' -d %{_sv_prefix} -G root,wheel -M -r -s /bin/bash %{_sv_user}

%files
%defattr(-,svyazcom,svyazcom,-)
%config(noreplace) %{_sv_nginx_confdir}/ui-kit.conf
%{_sv_application_dir}/
