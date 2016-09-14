angular.module('myApp')
.component('about', {
  template: `
    <section class="container text-center">
      <h1>Hello from our team!</h1>
      <h3 class="aboutHeader">Developers</h3>
      <div class="row">
        <div class="developers col-md-5 col-md-offset-1">
          <div class="col-md-5 col-md-offset-1"><img class="devPic" src="/images/brandon.jpg"></div>
          <div class="col-md-6 dev">
            <h4>Brandon Lucas</h4>
            <p class="email"> <a href="mailto:bc.lucas89@gmail.com">Email</a></p>
          </div>
        </div>
        <div class="developers col-md-5 col-md-offset-1">
          <div class="col-md-5 col-md-offset-1"><img class="devPic" src="/images/dan.jpg"></div>
          <div class="col-md-6 dev">
            <h4>Dan Wernstrom</h4>
            <p class="email"> <a href="mailto:dan.wernstrom@gmail.com">Email</a></p>
          </div>
        </div>
        <div class="developers col-md-5 col-md-offset-1">
          <div class="col-md-5 col-md-offset-1"><img class="devPic" src="/images/leslie.jpg"></div>
          <div class="col-md-6 dev">
            <h4>Leslie Hochsztein</h4>
            <p class="email"> <a href="mailto:lhochsz@gmail.com">Email</a></p>
            <p>Twitter: <a target="_blank" href="http://www.twitter.com/lhochsz">@lhochsz</a></p>
          </div>
        </div>
        <div class="developers col-md-5 col-md-offset-1">
          <div class="col-md-5 col-md-offset-1"><img class="devPic" src="/images/patrick.jpg"></div>
          <div class="col-md-6 dev">
            <h4>Patrick Rossetti</h4>
            <p class="email"> <a href="mailto:pqrosset@gmail.com">Email</a></p>
            <p>Twitter: <a target="_blank" href="http://www.twitter.com/prosset">@prosset</a></p>

          </div>
        </div>
      </div>
      <h1>This app uses the following Technologies</h1>
      <article class="col-md-6">
        <h3 class="aboutHeader">Client Technologies</h3>
        <ul class="no-bullets">
          <li ng-repeat = "tech in $ctrl.clientTechnologies">{{ tech }}</li>
        </ul>
      </article>
      <article class="col-md-6">
        <h3 class="aboutHeader">Server Technologies</h3>
        <ul class="no-bullets">
          <li ng-repeat = "tech in $ctrl.serverTechnologies">{{ tech }}</li>
        </ul>
      </article>
    </section>
  `,
  controller: function() {
    this.clientTechnologies = [
      'Angular 1.5',
      'Twitter Bootstrap',
      'Angular Messages (ngMessages)',
      'Angular Animate (ngAnimate)',
      'Angular UI Router'
    ];
    this.serverTechnologies = [
      'Express 4',
      'Passport',
      'Mongoose',
      'MongoDB',
      'NodeJS 6'
    ];
  }
});
