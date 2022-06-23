#! /bin/bash

# If current folder isn't the project root folder
if [ $(basename `pwd`) != 'feathersjs-sequelize-transaction-across-multiple-services' ]
then
   cd ..
fi

export PACKAGE_VERSION=$(grep "version" ./package.json | awk -F '"' '{ print $4 }')

#**************************************************
# Image name
#**************************************************
DOCKER_IMAGE_NAME="feathersjs-sequelize-transaction-across-multiple-services"

echo -e "image: \033[1;33m[ ${DOCKER_IMAGE_NAME} ]\033[0m"
echo -e "project version: \033[1;33m[ ${PACKAGE_VERSION} ]\033[0m"
echo
echo -e "\033[1;31mDo you want to proceed?\033[0m"
read -p "(y/N)" resposta

echo -e "\033[1;31mConfirm: \033[0m"
read -p "[${PACKAGE_VERSION}] " tag

if [ "${tag}" == "" ]; then
  tag=${PACKAGE_VERSION}
fi

while true
do
  case $resposta in
   [sS]* )
        docker build -t ${DOCKER_IMAGE_NAME}:${tag} .
        break;;

   [nN]* ) exit;;

   * )     exit;;
  esac
done

exit 0
