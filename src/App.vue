<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style>
    html,
    body {
        height: 100%;
    }

    body {
        /*display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;*/
        padding-top: 40px;
        padding-bottom: 40px;
        line-height: 1;
    }

    .text-center {
        text-align: center!important;
    }
    .form-center {
        width: 100%;
        max-width: 430px;
        padding: 15px;
        margin: auto;
    }
    .form-center .checkbox {
        font-weight: 400;
    }
    .form-center .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
    }
    .form-center .form-control:focus {
        z-index: 2;
    }

    .sidebar {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 100; /* Behind the navbar */
        padding: 48px 0 0; /* Height of navbar */
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
    }

    .sidebar-sticky {
        position: relative;
        top: 0;
        height: calc(100vh - 48px);
        padding-top: .5rem;
        overflow-x: hidden;
        overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
    }

    @supports ((position: -webkit-sticky) or (position: sticky)) {
        .sidebar-sticky {
            position: -webkit-sticky;
            position: sticky;
        }
    }

    .sidebar .nav-link {
        font-weight: 500;
        color: #333;
    }

    .sidebar .nav-link .feather {
        margin-right: 4px;
        color: #999;
    }

    .sidebar .nav-link.active {
        color: #007bff;
    }

    .sidebar .nav-link:hover .feather,
    .sidebar .nav-link.active .feather {
        color: inherit;
    }

    .sidebar-heading {
        font-size: .75rem;
        text-transform: uppercase;
    }

    /*
     * Content
     */

    [role="main"] {
        padding-top: 133px; /* Space for fixed navbar */
    }

    @media (min-width: 768px) {
        [role="main"] {
            padding-top: 48px; /* Space for fixed navbar */
        }
    }

    /*
     * Navbar
     */

    .navbar-brand {
        padding-top: .75rem;
        padding-bottom: .75rem;
        font-size: 1rem;
        background-color: rgba(0, 0, 0, .25);
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
    }

    .navbar .form-control {
        padding: .75rem 1rem;
        border-width: 0;
        border-radius: 0;
    }

    .form-control-dark {
        color: #fff;
        background-color: rgba(255, 255, 255, .1);
        border-color: rgba(255, 255, 255, .1);
    }

    .form-control-dark:focus {
        border-color: transparent;
        box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
    }

    .editor .btn {
        line-height: 1;
        margin-left: 10px;
    }
    </style>