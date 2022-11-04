<template>
    <main>
      <div class="row">
        <MenuItem v-for="(menu, i) in menus" :key="i" :menu="menu" />
      </div>
    </main>
</template>

<script>
  import MenuItem from '@/components/MenuItem.vue';
  export default {
    components: {
      MenuItem
    },
    data() {
      return {
        menus: [
          {
            title: 'New Deal',
            subTitle: 'Create a New Deal',
            icon: 'add.png',
            path: '/new-deal'
          },
          {
            title: 'All Deals',
            subTitle: 'Manage current deals and view your history',
            icon: 'deal.png',
            path: '/deals'
          },
          {
            title: 'Business Info',
            subTitle: 'manage business information like hours of operation',
            icon: 'business.png',
            path: '/business'
          },
          {
            title: 'Settings',
            subTitle: 'Manage password, Privacy Policy, Terms of Services',
            icon: 'settings.png',
            path: '/settings'
          },
          {
            title: 'Chamber Resources',
            subTitle: 'Resources provided by the Myrtle Beach Chamber of Commerce',
            icon: 'resources.png',
            path: '/'
          },
          {
            title: 'Help',
            subTitle: 'FAQ, Live Chat,Contact Information',
            icon: 'help.png',
            path: '/help'
          }
        ]
      }
    }
  }
</script>

<style>
.hr-login{
	padding: 2px ;
	background-color: black !important;
}
</style>