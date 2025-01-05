$(document).ready(function () {
  //Array to store pairs as objects
  const nameValuePairs = [];

  // pair validation\creation\display
  $("#add-button").click(function () {
    const userInput = $("#manage-input").val().trim();
    const regex = /^([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)$/;
    //validation
    if (regex.test(userInput)) {
      const [, name, value] = userInput.match(regex);
      //save Pair
      nameValuePairs.push({ name, value });
      //display
      updateTextArea(nameValuePairs);
      //clear field
      $("#manage-input").val("");
    } else {
      alert("Invalid input!");
    }
  });

  // Sort by Name
  $("#sortByName-button").click(function () {
    nameValuePairs.sort((a, b) => a.name.localeCompare(b.name));
    updateTextArea(nameValuePairs);
  });

  // Sort by Value
  $("#sortByValue-button").click(function () {
    nameValuePairs.sort((a, b) => a.value.localeCompare(b.value));
    updateTextArea(nameValuePairs);
  });

  // Generate XML
  $("#xml-button").click(function () {
    const xml = generateXML(nameValuePairs);
    // display the XML
    alert(xml);
  });

  // Delete
  $("#delete-button").click(function () {
    // get items
    const selectedItems = $("#manage-output").val().split("\n");

    // remove items from array
    for (const item of selectedItems) {
      const [name, value] = item.split("=");
      const index = nameValuePairs.findIndex(
        (pair) => pair.name === name && pair.value === value
      );

      if (index !== -1) {
        // remove object from array
        nameValuePairs.splice(index, 1);
      }
    }

    // update textarea
    updateTextArea(nameValuePairs);
  });

  // update textarea
  function updateTextArea(list) {
    const formattedList = list
      .map((pair) => `${pair.name}=${pair.value}`)
      .join("\n");
    $("#manage-output").val(formattedList);
  }

  // generate XML
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
