let c3DonutChart;

(function($) {
    'use strict';
    c3DonutChart = c3.generate({
        bindto: '#c3-donut-chart',
        data: {
            columns: [],
            type: 'donut',
            onclick: function(d, i) {
                console.log("onclick", d, i);
            },
            onmouseover: function(d, i) {
                console.log("onmouseover", d, i);
            },
            onmouseout: function(d, i) {
                console.log("onmouseout", d, i);
            }
        },
        color: {
            pattern: ['rgba(88,216,163,1)', 'rgba(4,189,254,0.6)', 'rgba(237,28,36,0.6)']
        },
        padding: {
            top: 0,
            right: 0,
            bottom: 30,
            left: 0,
        },
        donut: {
            label: {
                format: function(value) {
                    return value + '%';
                }
            }
        }
    });
})(jQuery);

// Function to update the donut chart with new data
function updateDonutChart(binWasteCounts) {
    // Calculate totals for each waste type
    let totalPaper = 0;
    let totalPlastic = 0;
    let totalOther = 0;
    let totalWaste = 0;

    // Sum up all waste counts
    Object.values(binWasteCounts).forEach(counts => {
        totalPaper += counts.Paper || 0;
        totalPlastic += counts.Plastic || 0;
        totalOther += counts.Other || 0;
    });

    totalWaste = totalPaper + totalPlastic + totalOther;

    // Calculate percentages
    const paperPercentage = totalWaste ? Math.round((totalPaper / totalWaste) * 100) : 0;
    const plasticPercentage = totalWaste ? Math.round((totalPlastic / totalWaste) * 100) : 0;
    const otherPercentage = totalWaste ? Math.round((totalOther / totalWaste) * 100) : 0;

    // Update the chart
    c3DonutChart.load({
        columns: [
            ["Paper", paperPercentage],
            ["Plastic", plasticPercentage],
            ["Other", otherPercentage],
        ]
    });
}
  