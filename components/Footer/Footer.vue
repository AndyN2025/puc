<template>
  <footer class="footer container">
    <div class="footer__container">
      
      <div class="footer__brand">
        <HeaderBrand />
        <p class="footer__copyright">
          © Приокский учебный центр<br />
          Автономная некоммерческая организация дополнительного профессионального образования, 2016–2025
        </p>
      </div>

      
       <div class="footer__navigation">
            <nav class="footer__nav" aria-label="Навигация для клиентов">
                <h3 class="footer__nav-title">Клиентам</h3>
                <ul class="footer__nav-list">
                  <li v-for="item in navItems" :key="item.to">
                      <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
                  </li>
                </ul>
            </nav>

            <ul class="footer__licenses-list">
                <li 
                  class="footer__licenses-item" 
                  v-for="item in licensesList" 
                  :key="item.url" 
                  @click="openDocument(item.url)">{{ item.title }}</li>
            </ul>
       </div>


      
      <div class="footer__contacts">
        <div class="footer__contacts-block">
            <div class="footer__contacts-content">
                <div class="footer__contacts-content__item">
                    <h3 class="footer__contacts-title">Для связи</h3>
                    <div class="footer__contacts-text">
                        <ul class="footer__contacts-list">
                            <li
                              v-for="p in SITE_PHONES"
                              :key="p.tel"
                              class="footer__contacts-item"
                            >
                              <a :href="`tel:${p.tel}`">{{ p.display8 }}</a>
                            </li>
                        </ul>
                        <a :href="siteMailto()" class="header__mail-text">{{ SITE_EMAIL }}</a>
                    </div>

                </div>
                <div class="footer__contacts-content__item">
                    <h3 class="footer__contacts-title">Адрес</h3>
                    <address class="footer__contacts-text">
                        {{ SITE_ADDRESS.footer }}
                    </address>
                </div>
            </div>
            <div class="footer__contacts-oferta">
              <span class="footer__contacts-oferta-text">Вся информация на сайте не является публичной офертой.</span>
              <button type="button" class="footer__cookie-settings" @click="openCookieConsentBanner">Настройки файлов cookie</button>
            </div>
        </div>

        
        <a
            :href="License"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__license-link"
            aria-label="Посмотреть государственную лицензию"
            >
            Государственная лицензия
        </a>
      </div>


    </div>
  </footer>
</template>

<script setup lang="ts">
import HeaderBrand from '@/components/Header/HeaderBrand.vue'
import { openCookieConsentBanner } from '@/utils/cookieConsent'
import { SITE_ADDRESS, SITE_EMAIL, SITE_PHONES, siteMailto } from '@/utils/site'
import License from '@/assets/documents/common/Лицензия на осуществление образовательной деятельности.pdf'
import Akkredit from '@/assets/documents/common/АккредитацияОТ2022.pdf'
import ReestrLic from '@/assets/documents/common/Выписка из реестра лицензий № Л035-01224-40-00374085.pdf'
import ReestrOrg from '@/assets/documents/common/Выписка из реестра организаций, оказывающих услуги в области охраны труда.pdf'

const navItems = [
  { to: '/', label: 'Главная' },
  { to: '/training_programs/', label: 'Программы обучения' },
  { to: '/docs/', label: 'Бланки документов' },
  { to: '/news/', label: 'Новости' },
  { to: '/contacts/', label: 'Контакты' },
];

const licensesList = [
    { title: 'Аккредитация', url: Akkredit },
    { title: 'Выписка из реестра лицензий', url: ReestrLic },
    { title: 'Выписка из реестра организаций', url: ReestrOrg },
]

const openDocument = (url:string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
</script>

<style lang="scss" scoped>
@use "./Footer.scss";
</style>