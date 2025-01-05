$(document).ready(function () {
  // Array to store pairs as objects
  const nameValuePairs = [];

  // Pair validation/creation/display
  $("#add-button").click(function () {
    const userInput = $("#manage-input").val().trim();
    const regex = /^([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)$/;

    // Validation
    if (regex.test(userInput)) {
      const [, name, value] = userInput.match(regex);
      // Save Pair
      nameValuePairs.push({ name, value });
      // Update the select element with new pairs
      updateSelect(nameValuePairs);
      // Clear input field
      $("#manage-input").val("");
    } else {
      alert("Invalid input!");
    }
  });

  // Sort by Name
  $("#sortByName-button").click(function () {
    nameValuePairs.sort((a, b) => a.name.localeCompare(b.name));
    updateSelect(nameValuePairs);
  });

  // Sort by Value
  $("#sortByValue-button").click(function () {
    nameValuePairs.sort((a, b) => a.value.localeCompare(b.value));
    updateSelect(nameValuePairs);
  });

  // Generate XML
  $("#xml-button").click(function () {
    const xml = generateXML(nameValuePairs);
    // Display the XML
    alert(xml);
  });

  // Delete selected items
  $("#delete-button").click(function () {
    // Get selected items from the select element
    const selectedItems = $("#manage-output").find(":selected");

    // Remove selected items from array
    selectedItems.each(function () {
      const selectedValue = $(this).val();
      const [name, value] = selectedValue.split("=");

      const index = nameValuePairs.findIndex(
        (pair) => pair.name === name && pair.value === value
      );

      if (index !== -1) {
        // Remove object from array
        nameValuePairs.splice(index, 1);
      }
    });

    // Update the select element with the remaining items
    updateSelect(nameValuePairs);
  });

  // Update select element with new list
  function updateSelect(list) {
    const selectElement = $("#manage-output");
    selectElement.empty(); // Clear the current options

    list.forEach((pair) => {
      // Create new option for each name/value pair
      const option = $("<option></option>")
        .attr("value", `${pair.name}=${pair.value}`)
        .text(`${pair.name}=${pair.value}`);
      selectElement.append(option); // Append the option to the select
    });
  }

  // Generate XML
  function generateXML(list) {
    const xmlPairs = list
      .map(
        (pair) =>
          `<pair><name>${pair.name}</name><value>${pair.value}</value></pair>`
      )
      .join("\n");
    return `<pairs>\n${xmlPairs}\n</pairs>`;
  }
});
