<template>
    <nav>
        <a class="menu" href="/">Display</a>
        <a class="menu" href="/etl">ETL</a>
    </nav>
</template>
<style>
nav {
    width: 100vw;
    height: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    justify-content: center;
    padding: 3px;
    margin-bottom: 5px;
}

nav .menu {
    text-decoration: none;
    font-size: 1.7rem;
    text-align: center;
    flex-grow: 1;
    color: #010101;
    background-color: #f5f7f7;
}

nav a.menu {
    border-left: 2.5px solid #c0c0c0;
    grid-gap: 3px;
}

nav a.menu:hover {
    background-color: #c0c0c0;
}
</style>
