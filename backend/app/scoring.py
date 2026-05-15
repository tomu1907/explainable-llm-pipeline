def compute_confidence(attributions, distances):
    attr_scores = [a["score"] for a in attributions]

    avg_attr = sum(attr_scores) / len(attr_scores)
    coverage = sum(1 for s in attr_scores if s > 0.7) / len(attr_scores)
    retrieval_strength = 1 / (1 + sum(distances) / len(distances))

    confidence = (
        0.5 * avg_attr +
        0.3 * coverage +
        0.2 * retrieval_strength
    )

    return round(confidence, 3)


def detect_failures(attributions, confidence):
    warnings = []

    if confidence < 0.5:
        warnings.append("Low confidence")

    if all(a["score"] < 0.4 for a in attributions):
        warnings.append("No grounding")

    if len([a for a in attributions if a["score"] < 0.5]) > len(attributions) / 2:
        warnings.append("Possible hallucination")

    return warnings
