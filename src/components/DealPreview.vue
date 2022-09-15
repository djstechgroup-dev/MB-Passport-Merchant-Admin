<template>
    <div>
        <div>
            <img
            v-if="filePreview"
            class="img-thumbnail" 
            alt="business photo"
            :src="filePreview" >

            <div v-else class="no-photo">
                <h1>Photo</h1>
            </div>  
        </div>
        

        <div v-if="deal" class="details">
            <h5>{{deal.businessName}}</h5>

            <div class="tags">
                <span class="tag tag-cat">{{deal.category}}</span>
                <span class="tag tag-loc">3.5 miles</span>
            </div>

            <p class="deals-use-remaining">
                <span class="used-deals">Used {{deal.used}} times,</span> 
                <span class="remaining-deals">{{deal.remaining}} remaining</span>
            </p>

            <div class="tagline">
                <span>{{deal.tagline}}</span>
            </div>
        </div>
    </div>
</template>

<script>

import {ref, watch} from 'vue'

export default {
    props: ['filePreview', 'deal'],
    setup(props) {
        watch(props, () => {
            
        })
    }

}

</script>

<style scoped>
    .no-photo {
        padding: 10px;
        border: 1px solid black;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 180px;
    }

    .details {
        margin-top: 5px;
    }

    .tags {
        display: flex;
        gap: 5px
    }

    .tag {
        font-size: 14px;
        padding: 1px 10px;
        border-radius: 20px;
        flex: 1
    }

    .tag-cat {
        color: #447fe5;
        background-color: #447fe525;
    }

    .tag-loc {
        border: 1px solid #000;
    }

    .deals-use-remaining {
        font-size: 14px;
        border-radius: 20px;
        background-color: rgba(5, 175, 175, 0.082);
        margin: 5px 0;
    }

    .used-deals {
        color: teal;
    }

    .remaining-deals {
        color: red;
    }

    .tagline {
        background-color: #FFD75B;
        border: 1px dashed #000;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.342);
        padding: 6px 0;
        width: 100%;
    }
</style>