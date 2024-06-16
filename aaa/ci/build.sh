#!/bin/bash

PROJECT_ROOT=$(git rev-parse --show-toplevel)
PACKAGE_NAME=$1
PACKAGE_VERSION=$2
APP_PATH=$3

cd "${PROJECT_ROOT}" || exit 1

# Create directory for build
rm -rf package/
rm -rf rpmbuild/
mkdir -p package/storybook
cp -r dist package/storybook

mkdir -p rpmbuild/{BUILD,BUILDROOT,RPMS,SOURCES,SPECS,SRPMS}
cp ci/package.spec rpmbuild/SPECS/

# Create source tarball
# Версию укажем полную
TARBALL_NAME="${PACKAGE_NAME}-${PACKAGE_VERSION}.tar.gz"
echo "${TARBALL_NAME}"
pushd ${PROJECT_ROOT}/package
tar -czf ../rpmbuild/SOURCES/"${TARBALL_NAME}" .
popd

rpmbuild -ba rpmbuild/SPECS/package.spec \
    --define "_topdir ${PWD}/rpmbuild" \
    --define "_sv_version ${PACKAGE_VERSION}" \
    --define "_sv_pkgname ${PACKAGE_NAME}" \
    --define "_sv_app_path ${APP_PATH}"
