

<template>
<div class="container_wrap mb-4">

    <link href="{% static 'css/owl.carousel.min.css' %}" rel="stylesheet" type="text/css" media="all"/>
    <link href="{% static 'css/owl.theme.default.min.css' %}" rel="stylesheet" type="text/css" media="all"/>

    <div class="carousel-wrapper">
        <div class="owl-carousel">

            {% for i in tvSeries %}
            {% include "micro.html" with i=i %}
            {% endfor %}

        </div>
    </div>
</div>
</template>

<script src="{% static 'js/owl.carousel.min.js' %}"></script>
<script>

  // Owl Carousel
  var owl = $(".owl-carousel");
  owl.owlCarousel({
    items: 5,
    margin: 10,
    loop: true,
    nav: true,
    autoWidth:true,
    center: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true

  });

</script>
