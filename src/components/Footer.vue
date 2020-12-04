<template>
    <footer id="footer">
    <!-- Footer Elements -->
    <div class="main_footer-top-wrapper">
        <div class="container align-items-center main-container">
            <div class="row">
                <!-- Call to action -->
                <ul class="top-footer col-12 d-flex justify-content-center align-items-center">
                    <li class="list-inline-item">
                        <h5 class="mb-1">Register for free</h5>
                    </li>
                    <li class="list-inline-item">
                        <a href="#!" class="btn btn-outline-white btn-rounded">Sign up!</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
        <!-- Call to action -->
        <div class="main_footer-bottom-wrapper">
            <!-- Footer Elements -->
            <div class="container   main-container">
                <div class="row">
                    <!-- Copyright -->
                    <div class="footer-copyright bottom-footer d-flex justify-content-center align-items-center col-12 ">
                        © 2020 Copyright:
                        <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
                    </div>
                    <!-- Copyright -->
                </div>
            </div>
        </div>
    </footer>

</template>

<style  scoped>
#footer {
    overflow: hidden;
}
footer .main_footer-top-wrapper{
    background-color:#2F3645;
    color: #fff;
}
footer .main_footer-top-wrapper .container .row{
    height: 10rem;
}
.main_footer-bottom-wrapper{
    background-color: #262C38;
}
footer .main_bottom-top-wrapper{
    font-size: 1.4rem;
    height: 5rem;
    color: rgba(255,255,255,0.6);
    background-color:#262C38;
}
.bottom-footer{
    height: 5rem;
}
footer .bottom-footer a{
    padding-left:1rem;
    color: #fff;
}
</style>