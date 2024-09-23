<template>
    <header class="mb-10 xl:mb-20">
        <nav>
            <ul class="flex flex-wrap -mx-3">
                <li class="px-3 pt-2.5">
                    <RouterLink
                        to="/today"
                        class="router-link text-xl font-bold text-gray-700 py-2.5 border-b-2 border-transparent rounded-t-lg cursor-pointer transition"
                    >
                        Today
                    </RouterLink>
                </li>
                <li class="pl-6 pt-2.5">
                    <RouterLink
                        to="/week"
                        class="router-link text-xl font-bold text-gray-700 py-2.5 border-b-2 border-transparent rounded-t-lg cursor-pointer transition"
                    >
                        Week
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>
