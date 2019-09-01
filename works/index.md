---
title: Works
layout: page
collection: works
entries_layout: grid
sort_by: date
sort_order: reverse
show_excerpts: true
read_time: false
---

<section class="taxonomy-section">
    <h2 class="taxonomy-title">Professional</h2>
    <div class="entries-{{ page.entries_layout | default: 'list' }}">
        {% assign entries = site.works | where_exp: "item", "item.categories contains 'Professional'" %}
        {% include documents-collection.html entries=entries sort_by=page.sort_by sort_order=page.sort_order %}
    </div>
</section>

<section class="taxonomy-section">
    <h2 class="taxonomy-title">Personal</h2>
    <div class="entries-{{ page.entries_layout | default: 'list' }}">
        {% assign entries = site.works | where_exp: "item", "item.categories contains 'Personal'" %}
        {% include documents-collection.html entries=entries sort_by=page.sort_by sort_order=page.sort_order %}
    </div>
</section>

<section class="taxonomy-section">
    <h2 class="taxonomy-title">Contributions</h2>
    <div class="entries-flex">
    {% include documents-collection.html entries=site.data.contributions sort_by=page.sort_by sort_order=page.sort_order %}
    </div>
</section>