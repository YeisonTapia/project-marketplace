<template>
  <div class="q-pa-xl w-100 shadow-2 q-mb-xl">
    <div class="row gutter-md">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
        <quiz></quiz>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
        <top-companies></top-companies> 
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
        <top-users></top-users>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
        <trivia :trivia="trivia" :isModal="false" className="home-trivia"></trivia>
      </div>
    </div>
  </div>
</template>
<script>
import quiz from 'src/components/master/home/quiz'
import topCompanies from 'src/components/master/home/topCompanies'
import topUsers from 'src/components/master/home/topUsers'
import trivia from 'src/components/master/home/trivia'
export default {
  name: 'TopComponent',
  components: {
      quiz,
      topCompanies,
      topUsers,
      trivia
  },
  data() {
    return {
      lang: this.$q.i18n.lang,
      trivia:  
        {
          id: '1',
          opened: false,
          image: '/assets/img/banner.png',
          summary: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy',
          questions: [
              {
                title: '¿En que año se inició la Copa América de fútbol?',
                options: [
                  {
                      label: '1920',
                      value: 'op1'
                  },
                  {
                      label: '1916',
                      value: 'op2'
                  },
                  {
                      label: '1926',
                      value: 'op3'
                  },
                ],
                answer: ''
              }
          ]
        }
    }
  }  
}
</script>
