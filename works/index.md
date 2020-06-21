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

{% assign entries = site.works | where_exp: "item", "item.categories contains 'Professional'" %}
{% include works-collection.html title="Professional" entries=entries %}

{% assign entries = site.works | where_exp: "item", "item.categories contains 'Personal'" %}
{% include works-collection.html title="Personal" entries=entries %}

{% include works-collection.html title="Contributions" entries=site.data.contributions %}