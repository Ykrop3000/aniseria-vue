<template>
<div class="header_slide-wrapper">
    <div class="container  main-container ">
        <form method="get" action="/search" id="searchslide"
              class="col-12 row  droptopbar loggedpane align-items-center justify-content-between">
            <md-field md-theme='default' md-inline class=" m-0 search-input">
                <label>Поиск по сайту...</label>
                <md-input  name="search" type="text" ></md-input>
            </md-field>
            <div class="search-button">
                <md-button class="md-raised">искать</md-button>
            </div>

        </form>
    </div>
</div>
</template>

